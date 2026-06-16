require('@babel/register')({
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ],
  extensions: ['.ts', '.tsx', '.js', '.jsx']
});

const React = require('react');
const { renderToString } = require('react-dom/server');

// Mock out react-router-dom, framer-motion, lucide-react etc.
jest = { mock: () => {} };
// we don't have jest, let's just try requiring it
try {
  const { AdminDashboard } = require('./src/admin/AdminDashboard.tsx');
  console.log("Successfully imported AdminDashboard");
} catch (e) {
  console.error("IMPORT ERROR:", e);
}
