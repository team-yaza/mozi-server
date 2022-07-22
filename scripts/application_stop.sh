#!/bin/bash

echo "Stopping any existing node servers"

netstat -ano | findstr :3001
taskkill /PID "123" /F 
