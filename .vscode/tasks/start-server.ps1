param (
	[string]$workspacePath
)

$htdoc = Join-Path $workspacePath "paradox-search"

$source = Join-Path $workspacePath "paradox-combination-wasm"
$export = Join-Path $htdoc "src/module/wasm"
wasm-pack build --target web --out-dir $export $source

$proc = Start-Process http-server -ArgumentList $htdoc, "--port", "8080" -PassThru

$temp = Join-Path $workspacePath "temp"
if (-not (Test-Path $temp)) {
	New-Item -ItemType Directory -Path $temp | Out-Null
}

$pidFile = Join-Path $temp "http-server.pid"
$proc.Id | Out-File -FilePath $pidFile -Encoding UTF8
