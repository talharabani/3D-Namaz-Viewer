@echo off
echo Starting Namaz Web Application...
echo.
echo Server will be available at:
echo - Local: http://localhost:3000 (or next available port)
echo - Network: http://172.25.112.1:3000
echo - Network: http://192.168.56.1:3000
echo - Network: http://192.168.18.12:3000
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak > nul
start http://localhost:3000
echo.
echo Website opened in your default browser!
echo.
echo Press Ctrl+C to stop the server
echo.
npm run dev
