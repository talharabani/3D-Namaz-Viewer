Write-Host "Starting Namaz Web Application..." -ForegroundColor Green
Write-Host ""
Write-Host "Server will be available at:" -ForegroundColor Yellow
Write-Host "- Local: http://localhost:3000 (or next available port)" -ForegroundColor Cyan
Write-Host "- Network: http://172.25.112.1:3000" -ForegroundColor Cyan
Write-Host "- Network: http://192.168.56.1:3000" -ForegroundColor Cyan
Write-Host "- Network: http://192.168.18.12:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening browser in 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"
Write-Host ""
Write-Host "Website opened in your default browser!" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""
npm run dev
