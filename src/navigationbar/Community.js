import React, { useState, useEffect } from 'react';
import './Community.css';
import Navbar from './Navbar';

function Community() {

    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Disable scrolling
        
        return () => {
            document.body.style.overflow = ''; // Restore scrolling when component unmounts
        };
    }, []);
    
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
            setUserId(user.id);
            fetchPosts();
        }
    }, []);

    const fetchPosts = async () => {
        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
    
            const params = new URLSearchParams({
                user_id: userId,
                d1: startDate.toISOString().split('T')[0],
                d2: endDate.toISOString().split('T')[0]
            });
    
            const url = `http://194.163.142.249:12020/getposts?`;
            console.log('GET Request URL:', url); // Log the URL being requested
    
            const response = await fetch(url);
            const data = await response.json();
            
            console.log('GET Response:', data); // Log the full response
            
            if (data.result) {
                setPosts(data.posts.map(post => ({
                    username: post.username,
                    text: post.txt,
                    timestamp: post.post_time
                })));
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handlePost = async () => {
        if (!postText.trim() || !userId) return;
    
        try {
            const postData = {
                user_id: userId,
                txt: postText.trim()
            };
            
            console.log('POST Request Data:', postData); // Log the data being sent
    
            const response = await fetch('http://194.163.142.249:12020/createPost', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(postData),
            });
    
            const data = await response.json();
            console.log('POST Response:', data); // Log the full response
    
            if (data.result === true) {
                await fetchPosts();
                setPostText('');
            } else {
                alert(`ERROR: ${data?.error?.detail || 'Failed to create post'}`);
            }
        } catch (error) {
            console.error('Error posting:', error);
            alert('Failed to connect to server');
        }
    };

    return (
        <>
            <Navbar />
            <div className="community-container">
                {/* Channel list remains same */}
                <div className="channel-list">
                    <h3>Channels</h3>
                    {["Astrophysics", "Quantum Physics", "Fluid Dynamics", "Optics", 
                     "Exoplanet Discovery", "Galactic Collision"].map((channel, index) => (
                        <div key={index} className="channel">{channel}</div>
                    ))}
                </div>

                {/* Post section */}
                <div className="post-section">
                    <h2>Community Posts</h2>
                    <div className="posts">
                        {posts.length > 0 ? posts.map((post, index) => (
                            <div key={index} className="post">
                                <p><strong>{post.username}</strong> - {post.timestamp}</p>
                                <p>{post.text}</p>
                            </div>
                        )) : <p>No posts yet.</p>}
                    </div>
                </div>

                {/* Post input */}
                {username && (
                    <div className="post-form-container">
                        <textarea
                            placeholder="Write your post..."
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                        <button onClick={handlePost}>Post</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Community;