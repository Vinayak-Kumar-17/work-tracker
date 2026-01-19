import { useState, useEffect } from 'react';
import './App.css';

const API_BASE = '/api/workitems';

function App() {
    const [workItems, setWorkItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', status: 'To-Do' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all work items
    const fetchWorkItems = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_BASE);
            if (!response.ok) throw new Error('Failed to fetch work items');
            const data = await response.json();
            setWorkItems(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching work items:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkItems();
    }, []);

    // Create new work item
    const handleCreateItem = async (e) => {
        e.preventDefault();
        if (!newItem.title.trim()) {
            setError('Title is required');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            if (!response.ok) throw new Error('Failed to create work item');
            await fetchWorkItems();
            setNewItem({ title: '', description: '', status: 'To-Do' });
        } catch (err) {
            setError(err.message);
            console.error('Error creating work item:', err);
        } finally {
            setLoading(false);
        }
    };

    // Update work item status
    const handleUpdateStatus = async (item, newStatus) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/${item.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, status: newStatus })
            });
            if (!response.ok) throw new Error('Failed to update work item');
            await fetchWorkItems();
        } catch (err) {
            setError(err.message);
            console.error('Error updating work item:', err);
        } finally {
            setLoading(false);
        }
    };

    // Delete work item
    const handleDeleteItem = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete work item');
            await fetchWorkItems();
        } catch (err) {
            setError(err.message);
            console.error('Error deleting work item:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'To-Do': return 'bg-indigo-500';
            case 'In Progress': return 'bg-amber-500';
            case 'Done': return 'bg-emerald-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="app">
            <div className="container">
                <header className="header">
                    <h1 className="title">Work Tracker</h1>
                    <p className="subtitle">Manage your team's tasks with clarity and focus.</p>
                </header>

                {error && (
                    <div className="error-message">
                        <span>{error}</span>
                        <button onClick={() => setError('')} className="close-btn">×</button>
                    </div>
                )}

                <form onSubmit={handleCreateItem} className="form-card">
                    <h2 className="form-title">
                        <span>New Task</span>
                    </h2>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="What needs to be done?"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            className="input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Add details about this task..."
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            className="textarea"
                            rows="3"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={newItem.status}
                            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                            className="select"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Task'}
                    </button>
                </form>

                <div className="work-items-section">
                    <h2 className="section-title">
                        Tasks
                        <span style={{ fontSize: '1rem', opacity: 0.6, fontWeight: 400 }}>{workItems.length} total</span>
                    </h2>

                    {loading && workItems.length === 0 ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Syncing tasks...</p>
                        </div>
                    ) : workItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>No tasks yet</h3>
                            <p>Create your first task above to get started.</p>
                        </div>
                    ) : (
                        <div className="work-items-grid">
                            {workItems.map((item) => (
                                <div key={item.id} className="work-item-card">
                                    <div className="card-header">
                                        <h3 className="card-title">{item.title}</h3>
                                        <span
                                            className="status-badge"
                                            style={{
                                                backgroundColor: item.status === 'Done' ? '#10b981' : item.status === 'In Progress' ? '#f59e0b' : '#6366f1'
                                            }}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="card-description">
                                        {item.description || "No description provided."}
                                    </p>
                                    <div className="card-footer">
                                        <div className="status-buttons">
                                            {['To-Do', 'In Progress', 'Done'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleUpdateStatus(item, status)}
                                                    className={`status-btn ${item.status === status ? 'active' : ''}`}
                                                    disabled={loading}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="btn-delete"
                                            disabled={loading}
                                        >
                                            Delete Task
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
