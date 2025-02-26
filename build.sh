#!/bin/bash
# build.sh - Build n8n-nodes-useapi and copy to n8n custom directory

# Set your project directory
PROJECT_DIR=~/n8n_dev/n8n-nodes-useapi
N8N_CUSTOM_DIR=~/.n8n/custom

# Change to project directory
echo "Changing to project directory: $PROJECT_DIR"
cd $PROJECT_DIR || { echo "Error: Could not change to project directory"; exit 1; }

# Run build
echo "Building project..."
pnpm run build
if [ $? -ne 0 ]; then
  echo "Error: Build failed"
  exit 1
fi

# Create custom directory if it doesn't exist
mkdir -p $N8N_CUSTOM_DIR

# Copy built files
echo "Copying files to n8n custom directory: $N8N_CUSTOM_DIR"
cp -r dist/* $N8N_CUSTOM_DIR/

echo "Build and installation completed successfully"
echo "Restarting n8n..."

# Try different methods to restart n8n
# Method 1: If running as systemd service
if systemctl is-active --quiet n8n; then
  sudo systemctl restart n8n
  echo "Restarted n8n via systemd"
  exit 0
fi

# Method 2: If running as PM2 process
if command -v pm2 &> /dev/null && pm2 list | grep -q n8n; then
  pm2 restart n8n
  echo "Restarted n8n via PM2"
  exit 0
fi

# Method 3: Manual restart (kill and start again)
pkill -f "n8n start" || true
echo "Killed existing n8n process"
nohup n8n start > /dev/null 2>&1 &
echo "Started n8n in background"
echo "n8n restarted successfully"
