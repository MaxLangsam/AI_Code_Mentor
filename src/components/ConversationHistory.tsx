
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Search, Trash2, BookmarkPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SavedConversation {
  id: string;
  title: string;
  timestamp: Date;
  language: string;
  messages: any[];
  bookmarked: boolean;
}

interface ConversationHistoryProps {
  currentMessages: any[];
  currentLanguage: string;
  onLoadConversation: (messages: any[]) => void;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  currentMessages,
  currentLanguage,
  onLoadConversation,
}) => {
  const [conversations, setConversations] = useState<SavedConversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('codementor-conversations');
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed.map((conv: any) => ({
        ...conv,
        timestamp: new Date(conv.timestamp)
      })));
    }
  }, []);

  const saveCurrentConversation = () => {
    if (currentMessages.length <= 1) {
      toast({
        title: "Nothing to Save",
        description: "Start a conversation first before saving.",
      });
      return;
    }

    const title = `${currentLanguage} Session - ${new Date().toLocaleDateString()}`;
    const newConversation: SavedConversation = {
      id: Date.now().toString(),
      title,
      timestamp: new Date(),
      language: currentLanguage,
      messages: currentMessages,
      bookmarked: false,
    };

    const updated = [newConversation, ...conversations];
    setConversations(updated);
    localStorage.setItem('codementor-conversations', JSON.stringify(updated));

    toast({
      title: "💾 Conversation Saved!",
      description: `Saved as "${title}"`,
    });
  };

  const deleteConversation = (id: string) => {
    const updated = conversations.filter(conv => conv.id !== id);
    setConversations(updated);
    localStorage.setItem('codementor-conversations', JSON.stringify(updated));

    toast({
      title: "🗑️ Conversation Deleted",
      description: "Conversation has been removed from history.",
    });
  };

  const toggleBookmark = (id: string) => {
    const updated = conversations.map(conv =>
      conv.id === id ? { ...conv, bookmarked: !conv.bookmarked } : conv
    );
    setConversations(updated);
    localStorage.setItem('codementor-conversations', JSON.stringify(updated));
  };

  const loadConversation = (conversation: SavedConversation) => {
    onLoadConversation(conversation.messages);
    setIsOpen(false);
    toast({
      title: "📖 Conversation Loaded",
      description: `Loaded "${conversation.title}"`,
    });
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
          <History className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Conversation History</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={saveCurrentConversation} variant="outline">
              Save Current
            </Button>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {conversations.length === 0 ? 'No saved conversations yet' : 'No conversations match your search'}
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => loadConversation(conversation)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{conversation.title}</span>
                        {conversation.bookmarked && (
                          <BookmarkPlus className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {conversation.language} • {conversation.timestamp.toLocaleDateString()} • {conversation.messages.length} messages
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(conversation.id)}
                        className="h-8 w-8 p-0"
                      >
                        <BookmarkPlus className={`w-4 h-4 ${conversation.bookmarked ? 'text-yellow-500' : 'text-gray-400'}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteConversation(conversation.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationHistory;
