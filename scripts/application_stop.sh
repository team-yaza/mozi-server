#!/bin/bash

netstat -ano | findstr :3001
taskkill /PID "123" /F 
