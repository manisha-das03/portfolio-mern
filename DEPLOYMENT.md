# Deployment Guide

This guide covers multiple deployment options for your MERN stack portfolio.

## 🚀 Quick Deploy Options

### Option 1: Vercel + MongoDB Atlas (Recommended)

**Frontend (Vercel):**
1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/build`

**Backend (Railway/Heroku):**
1. Deploy to [Railway](https://railway.app) or [Heroku](https://heroku.com)
2. Set environment variables (see below)
3. Update frontend API URLs

**Database (MongoDB Atlas):**
1. Create free cluster at [MongoDB Atlas](https://mongodb.com/atlas)
2. Get connection string
3. Update `MONGODB_URI` in backend

### Option 2: Netlify + Heroku

**Frontend (Netlify):**
1. Connect GitHub repo to [Netlify](https://netlify.com)
2. Build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/build`

**Backend (Heroku):**
```bash
cd server
heroku create your-portfolio-api
git subtree push --prefix server heroku main
```

### Option 3: Docker Deployment

```bash
# Clone and setup
git clone your-repo
cd portfolio-mern

# Start with Docker Compose
docker-compose up -d

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

## 🔧 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
```

## 📊 Analytics Setup

### Google Analytics
1. Create GA4 property at [Google Analytics](https://analytics.google.com)
2. Get tracking ID (G-XXXXXXXXXX)
3. Add to frontend environment variables
4. Analytics will auto-track page views and events

### Performance Monitoring
- **Vercel Analytics**: Automatic with Vercel deployment
- **Netlify Analytics**: Available in Netlify dashboard
- **Custom**: Use Google PageSpeed Insights

## 🔒 Security Checklist

### Production Security
- [ ] Change default admin credentials in `server/routes/auth.js`
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS (automatic with Vercel/Netlify)
- [ ] Set up CORS properly for production domains
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting (add express-rate-limit)

### Content Security
- [ ] Validate all file uploads
- [ ] Sanitize user inputs
- [ ] Use HTTPS for all external resources
- [ ] Regular security updates (`npm audit`)

## 🎯 Performance Optimization

### Frontend Optimizations
- ✅ Code splitting with React.lazy()
- ✅ Image lazy loading
- ✅ Gzip compression (Nginx/CDN)
- ✅ Static asset caching
- ✅ Bundle size optimization

### Backend Optimizations
- ✅ MongoDB indexing
- ✅ Response compression
- ✅ Cloudinary image optimization
- ✅ API response caching
- ✅ Connection pooling

## 📱 PWA Features

Your portfolio includes PWA capabilities:
- Offline functionality
- App-like experience
- Install prompt on mobile
- Fast loading with service workers

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      # Add your deployment steps here
      - run: npm install
      - run: npm run build
      - run: npm test
```

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version (use 18+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

**API Connection Issues:**
- Verify CORS settings
- Check environment variables
- Ensure backend is deployed and accessible

**Database Connection:**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

### Monitoring

**Health Checks:**
- Backend: `GET /api/health`
- Database: Monitor connection status
- Frontend: Check console for errors

**Logs:**
- Vercel: Function logs in dashboard
- Heroku: `heroku logs --tail`
- Railway: Built-in log viewer

## 📈 Post-Deployment

### SEO Optimization
1. Submit sitemap to Google Search Console
2. Verify structured data with Google's Rich Results Test
3. Monitor Core Web Vitals
4. Set up Google My Business (if applicable)

### Content Management
1. Log into `/admin` with your credentials
2. Upload your resume (PDF format)
3. Add your projects with GitHub links
4. Update your profile information
5. Create blog posts to improve SEO

### Maintenance
- Regular dependency updates
- Monitor performance metrics
- Backup database regularly
- Review security logs

## 🎉 Go Live Checklist

- [ ] Domain configured and SSL enabled
- [ ] All environment variables set
- [ ] Admin credentials changed
- [ ] Analytics tracking active
- [ ] Contact form working
- [ ] Resume download functional
- [ ] All social links updated
- [ ] SEO meta tags customized
- [ ] Sitemap submitted to search engines
- [ ] Performance tested (PageSpeed Insights)

Your portfolio is now ready to impress recruiters! 🚀