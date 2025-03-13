# Create css and js directories if they don't exist
New-Item -ItemType Directory -Force -Path "css"
New-Item -ItemType Directory -Force -Path "js"

# Update all HTML files to include the new navigation
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Add navigation CSS and JS
    $content = $content -replace '<link rel="stylesheet" href=".*style.css">', '<link href="css/navigation.css" rel="stylesheet">'
    $content = $content -replace '</body>', '<script src="js/navigation.js"></script></body>'
    
    # Save the file
    $content | Set-Content $_.FullName -Force
}
