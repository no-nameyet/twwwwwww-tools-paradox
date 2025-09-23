param (
	[string]$workspacePath
)

$pidFile = Join-Path $workspacePath "temp/http-server.pid"

if (Test-Path $pidFile) {
	Stop-Process -Id (Get-Content $pidFile) -Force
	Remove-Item $pidFile -Force
}
