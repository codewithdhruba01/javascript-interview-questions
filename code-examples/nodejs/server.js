/**
 * Node.js Server Example - Interview Questions
 * Demonstrates HTTP server, file operations, and middleware
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

// In-memory data store (for demo purposes)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

let posts = [
  { id: 1, userId: 1, title: 'First Post', content: 'This is my first post!', createdAt: new Date() },
  { id: 2, userId: 2, title: 'Hello World', content: 'Welcome to my blog!', createdAt: new Date() },
  { id: 3, userId: 1, title: 'Node.js Tips', content: 'Here are some Node.js tips...', createdAt: new Date() }
];

// Middleware functions
function jsonMiddleware(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
}

function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  next();
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Authorization required' }));
    return;
  }

  // Simple token validation (in real app, verify JWT)
  const token = authHeader.substring(7);
  if (token !== 'valid-token') {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid token' }));
    return;
  }

  next();
}

function loggingMiddleware(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // Override res.end to log response time
  const originalEnd = res.end;
  res.end = function(...args) {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    originalEnd.apply(this, args);
  };

  next();
}

// Route handlers
function handleUsers(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const userId = parsedUrl.pathname.split('/')[3];

  switch (req.method) {
    case 'GET':
      if (userId) {
        // GET /api/users/:id
        const user = users.find(u => u.id === parseInt(userId));
        if (!user) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'User not found' }));
          return;
        }
        res.end(JSON.stringify(user));
      } else {
        // GET /api/users
        const { role, limit = 10, offset = 0 } = parsedUrl.query;
        let filteredUsers = users;

        if (role) {
          filteredUsers = users.filter(u => u.role === role);
        }

        const paginatedUsers = filteredUsers.slice(offset, offset + parseInt(limit));
        res.end(JSON.stringify({
          users: paginatedUsers,
          total: filteredUsers.length,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }));
      }
      break;

    case 'POST':
      // POST /api/users
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const newUser = JSON.parse(body);

          // Validation
          if (!newUser.name || !newUser.email) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Name and email are required' }));
            return;
          }

          // Check if email already exists
          if (users.some(u => u.email === newUser.email)) {
            res.writeHead(409);
            res.end(JSON.stringify({ error: 'Email already exists' }));
            return;
          }

          newUser.id = Math.max(...users.map(u => u.id)) + 1;
          newUser.role = newUser.role || 'user';
          users.push(newUser);

          res.writeHead(201);
          res.end(JSON.stringify(newUser));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      break;

    case 'PUT':
      if (!userId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'User ID required' }));
        return;
      }

      let updateBody = '';
      req.on('data', chunk => {
        updateBody += chunk.toString();
      });

      req.on('end', () => {
        try {
          const updates = JSON.parse(updateBody);
          const userIndex = users.findIndex(u => u.id === parseInt(userId));

          if (userIndex === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
          }

          // Update user (preserve id)
          users[userIndex] = { ...users[userIndex], ...updates };
          res.end(JSON.stringify(users[userIndex]));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      break;

    case 'DELETE':
      if (!userId) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'User ID required' }));
        return;
      }

      const deleteIndex = users.findIndex(u => u.id === parseInt(userId));
      if (deleteIndex === -1) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'User not found' }));
        return;
      }

      const deletedUser = users.splice(deleteIndex, 1)[0];
      res.end(JSON.stringify(deletedUser));
      break;

    default:
      res.writeHead(405);
      res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}

function handlePosts(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const postId = parsedUrl.pathname.split('/')[3];

  switch (req.method) {
    case 'GET':
      if (postId) {
        // GET /api/posts/:id
        const post = posts.find(p => p.id === parseInt(postId));
        if (!post) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Post not found' }));
          return;
        }
        res.end(JSON.stringify(post));
      } else {
        // GET /api/posts
        const { userId, limit = 10 } = parsedUrl.query;
        let filteredPosts = posts;

        if (userId) {
          filteredPosts = posts.filter(p => p.userId === parseInt(userId));
        }

        const limitedPosts = filteredPosts.slice(0, parseInt(limit));
        res.end(JSON.stringify(limitedPosts));
      }
      break;

    case 'POST':
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const newPost = JSON.parse(body);

          if (!newPost.title || !newPost.content || !newPost.userId) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Title, content, and userId are required' }));
            return;
          }

          // Verify user exists
          if (!users.some(u => u.id === newPost.userId)) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Invalid userId' }));
            return;
          }

          newPost.id = Math.max(...posts.map(p => p.id)) + 1;
          newPost.createdAt = new Date();
          posts.push(newPost);

          res.writeHead(201);
          res.end(JSON.stringify(newPost));
        } catch (error) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      break;

    default:
      res.writeHead(405);
      res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}

function handleStats(req, res) {
  const stats = {
    totalUsers: users.length,
    totalPosts: posts.length,
    usersByRole: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {}),
    averagePostsPerUser: posts.length / users.length,
    recentPosts: posts.slice(-5).map(p => ({
      id: p.id,
      title: p.title,
      author: users.find(u => u.id === p.userId)?.name || 'Unknown'
    }))
  };

  res.end(JSON.stringify(stats));
}

// File upload handler
async function handleFileUpload(req, res) {
  const boundary = req.headers['content-type'].split('boundary=')[1];
  let body = Buffer.alloc(0);

  req.on('data', chunk => {
    body = Buffer.concat([body, chunk]);
  });

  req.on('end', async () => {
    try {
      // Simple multipart parsing (in real app, use a library like multer)
      const parts = body.toString().split(`--${boundary}`);
      const filePart = parts.find(part => part.includes('filename'));

      if (!filePart) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'No file uploaded' }));
        return;
      }

      // Extract filename and content
      const filenameMatch = filePart.match(/filename="([^"]+)"/);
      if (!filenameMatch) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid filename' }));
        return;
      }

      const filename = filenameMatch[1];
      const contentStart = filePart.indexOf('\r\n\r\n') + 4;
      const fileContent = filePart.slice(contentStart).replace(/\r\n--$/, '');

      // Save file
      const filePath = path.join(__dirname, 'uploads', filename);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, Buffer.from(fileContent, 'binary'));

      res.writeHead(201);
      res.end(JSON.stringify({
        message: 'File uploaded successfully',
        filename,
        path: filePath,
        size: fileContent.length
      }));

    } catch (error) {
      console.error('File upload error:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Upload failed' }));
    }
  });
}

// Router function
function router(req, res) {
  const parsedUrl = url.parse(req.url, true);

  // Apply middleware
  corsMiddleware(req, res, () => {
    jsonMiddleware(req, res, () => {
      loggingMiddleware(req, res, () => {

        // Routes
        if (parsedUrl.pathname.startsWith('/api/users')) {
          handleUsers(req, res);
        } else if (parsedUrl.pathname.startsWith('/api/posts')) {
          handlePosts(req, res);
        } else if (parsedUrl.pathname === '/api/stats') {
          handleStats(req, res);
        } else if (parsedUrl.pathname === '/api/upload' && req.method === 'POST') {
          handleFileUpload(req, res);
        } else if (parsedUrl.pathname === '/health') {
          res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify({ error: 'Route not found' }));
        }

      });
    });
  });
}

// Create and start server
const server = http.createServer(router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   GET  /api/users - List users`);
  console.log(`   POST /api/users - Create user`);
  console.log(`   GET  /api/posts - List posts`);
  console.log(`   POST /api/posts - Create post`);
  console.log(`   GET  /api/stats - Get statistics`);
  console.log(`   GET  /health - Health check`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = server;
