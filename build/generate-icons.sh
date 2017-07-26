#!/usr/bin/env bash
# inkscape -z -e apple-touch-icon.png    -w  180 -h  180 icon.svg
# inkscape -z -e tile.png    -w  558 -h  558 icon.svg
# convert tile.png -crop 558x270+0+135 tile-wide.png
# convert tile.png -resize 32x32 favicon.ico
#
# inkscape -z -e app-icon_LDPI.png    -w  36 -h  36 icon.svg
# inkscape -z -e app-icon_MDPI.png    -w  48 -h  48 icon.svg
# inkscape -z -e app-icon_HDPI.png    -w  72 -h  72 icon.svg
# inkscape -z -e app-icon_XHDPI.png   -w  96 -h  96 icon.svg
# inkscape -z -e app-icon_XXHDPI.png  -w 144 -h 144 icon.svg
# inkscape -z -e app-icon_XXXHDPI.png -w 192 -h 192 icon.svg
# inkscape -z -e app-icon_WEB.png     -w 512 -h 512 icon.svg

self_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

target_dir="$self_path/../static/img/icons"
source_svg="$self_path/../src/assets/app-icon.inkscape.svg"

inkscape -z -e $target_dir/android-chrome-192x192.png   -w 192 -h 192 $source_svg
inkscape -z -e $target_dir/android-chrome-512x512.png   -w 180 -h 180 $source_svg
inkscape -z -e $target_dir/apple-touch-icon.png         -w 192 -h 192 $source_svg
inkscape -z -e $target_dir/apple-touch-icon-60x60.png   -w  60 -h  60 $source_svg
inkscape -z -e $target_dir/apple-touch-icon-76x76.png   -w  76 -h  76 $source_svg
inkscape -z -e $target_dir/apple-touch-icon-120x120.png -w 120 -h 120 $source_svg
inkscape -z -e $target_dir/apple-touch-icon-152x152.png -w 152 -h 152 $source_svg
inkscape -z -e $target_dir/apple-touch-icon-180x180.png -w 180 -h 180 $source_svg

convert $target_dir/android-chrome-512x512.png -resize 48x48 $target_dir/favicon.ico
inkscape -z -e $target_dir/favicon-16x16.png            -w  16 -h  16 $source_svg
inkscape -z -e $target_dir/favicon-32x32.png            -w  32 -h  32 $source_svg
inkscape -z -e $target_dir/msapplication-icon-144x144.png   -w 144 -h 144 $source_svg
inkscape -z -e $target_dir/mstile-150x150.png           -w 150 -h 150 $source_svg
inkscape -z --export-plain-svg $target_dir/safari-pinned-tab.svg -w  20 -h  20 $source_svg
