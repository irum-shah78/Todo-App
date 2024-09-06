import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useTodo from '../../hooks/useTodos';
import { useSession } from 'next-auth/react';

const useAddList = () => {
  const { addNewTodo } = useTodo();
  const { data: session } = useSession();
  const [listName, setListName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const router = useRouter();

  const handleAddList = async () => {
    if (listName.trim()) {
      const userEmail = session?.user?.email;
      if (userEmail) {
        try {
          await addNewTodo(listName, userEmail, selectedTheme);
          setListName('');
          setSelectedTheme(''); 
          toast.success('List added successfully!');
          setTimeout(() => {
            router.push('/todos/todo');
          }, 2000);
        } catch (error) {
          toast.error('Failed to add list');
        }
      } else {
        toast.error('User not found');
      }
    } else {
      toast.error('Please enter the list name');
    }
  };

  return {
    listName,
    selectedTheme,
    setListName,
    setSelectedTheme,
    handleAddList,
  };
};

export default useAddList;
