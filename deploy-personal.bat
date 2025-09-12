@echo off
echo ========================================
echo 個人アカウントでデプロイ
echo ========================================
echo.
echo 以下の質問に答えてください：
echo.
echo 1. Set up and deploy? → Y
echo 2. Which scope? → andoumizuki1209-4085 (個人アカウント)を選択
echo 3. Link to existing project? → N (新規プロジェクト)
echo 4. Project name? → synqai-lp-public
echo 5. In which directory is your code? → . (Enter)
echo 6. Want to modify these settings? → N
echo.
echo ========================================
echo.
vercel --prod
pause