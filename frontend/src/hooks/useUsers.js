import { useCallback, useEffect, useState } from 'react';
import { fetchUsersFromGraphql, fetchUsersFromRest } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const graphQLUsers = await fetchUsersFromGraphql();
      if (graphQLUsers.length > 0) {
        setUsers(graphQLUsers);
        setIsLoading(false);
        return;
      }
    } catch {
      // Fallback to REST if GraphQL users query is not available.
    }

    try {
      const restUsers = await fetchUsersFromRest();
      setUsers(restUsers);
    } catch (requestError) {
      setUsers([]);
      setError(requestError.message || 'Unable to load users.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    isLoading,
    error,
    retry: loadUsers
  };
}
