$base = "d:\latest_projects\restuarent\assets\hotel"

$downloads = @(
    @("hero-aerial.jpg", "https://www.raysinn.in/wp-content/uploads/2024/02/DJI_0305-copy.jpg"),
    @("exterior.jpg", "https://www.raysinn.in/wp-content/uploads/2024/02/SLY_0198-copy.jpg"),
    @("suite-room.jpg", "https://www.raysinn.in/wp-content/uploads/2024/02/SLY_0257-copy.jpg"),
    @("room-sitting.jpg", "https://www.raysinn.in/wp-content/uploads/2024/02/SLY_0232-copy.jpg"),
    @("reception.jpg", "https://www.raysinn.in/wp-content/uploads/2024/02/SLY_0124-copy.jpg"),
    @("hallway.jpg", "https://www.raysinn.in/wp-content/uploads/2024/02/SLY_0243-copy.jpg"),
    @("room-interior-1.jpg", "https://www.raysinn.in/wp-content/uploads/2024/12/f85b3746-2049-4b10-97b7-51b66553a7e5.jpg"),
    @("room-interior-2.jpg", "https://www.raysinn.in/wp-content/uploads/2024/12/fe8b908a-d8e2-48d3-a178-afc7872cad1f.jpg")
)

foreach ($item in $downloads) {
    $name = $item[0]
    $url = $item[1]
    $path = Join-Path $base $name
    Write-Host "Downloading $name..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing
        Write-Host "  Done: $name"
    } catch {
        Write-Host "  FAILED: $name - $_"
    }
}

Write-Host "`nAll downloads complete!"
Get-ChildItem $base | Format-Table Name, Length
