import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBanner from '../components/StatusBanner';
import { API_CONFIG } from '../services/config';
import { getRest, postRest, putRest, deleteRest } from '../services/restApi';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [formMode, setFormMode] = useState('add');
  const [editingUser, setEditingUser] = useState(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getRest(`${API_CONFIG.gatewayRestUrl}/users`);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load users.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const resetForm = () => {
    setFormMode('add');
    setEditingUser(null);
    setFormName('');
    setFormEmail('');
    setFormError('');
  };

  const handleEdit = (user) => {
    setFormMode('edit');
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormError('');
  };

  const handleDelete = async (userId) => {
    try {
      await deleteRest(`${API_CONFIG.gatewayRestUrl}/users/${userId}`);
      setSuccessMessage('User deleted successfully.');
      loadUsers();
    } catch (err) {
      setError(err.message || 'Failed to delete user.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim() || !formEmail.trim()) {
      setFormError('Name and email are required.');
      return;
    }

    setFormLoading(true);
    try {
      if (formMode === 'add') {
        await postRest(`${API_CONFIG.gatewayRestUrl}/users`, { name: formName, email: formEmail });
        setSuccessMessage('User created successfully.');
      } else {
        await putRest(`${API_CONFIG.gatewayRestUrl}/users/${editingUser.id}`, { name: formName, email: formEmail });
        setSuccessMessage('User updated successfully.');
      }
      resetForm();
      loadUsers();
    } catch (err) {
      setFormError(err.message || 'Operation failed.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="container page page-home">
      <section className="hero-card">
        <p className="eyebrow">University Microservices Project</p>
        <h1>Professional React Frontend Connected to API Gateway</h1>
        <p>
          This frontend integrates with REST and GraphQL endpoints for a production-like architecture.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" to="/products">
            Browse Products
          </Link>
          <Link className="btn btn-ghost" to="/orders">
            View Orders
          </Link>
        </div>
      </section>

      {successMessage ? (
        <StatusBanner tone="success">{successMessage}</StatusBanner>
      ) : null}

      <section className="panel">
        <div className="panel-header">
          <h2>User Management</h2>
          <button className="btn btn-ghost" type="button" onClick={loadUsers}>
            Refresh
          </button>
        </div>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="user-form-fields">
            <input
              className="input"
              placeholder="Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
            <input
              className="input"
              placeholder="Email"
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={formLoading}>
              {formLoading ? 'Saving...' : formMode === 'add' ? 'Add User' : 'Update User'}
            </button>
            {formMode === 'edit' ? (
              <button className="btn btn-ghost" type="button" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
          {formError ? <p className="form-error">{formError}</p> : null}
        </form>

        {isLoading ? <LoadingSpinner label="Loading users..." /> : null}

        {!isLoading && error ? (
          <ErrorState title="Failed to load users" message={error} onRetry={loadUsers} />
        ) : null}

        {!isLoading && !error && users.length === 0 ? (
          <p className="empty-message">No users found. Add one above.</p>
        ) : null}

        {!isLoading && !error && users.length > 0 ? (
          <div className="user-table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id || user.email}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="actions-cell">
                      <button className="btn btn-ghost btn-sm" type="button" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default HomePage;
