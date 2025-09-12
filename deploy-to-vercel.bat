@echo off
echo ========================================
echo Vercel Deployment Script for SYNQAI LP
echo ========================================
echo.

echo Step 1: Vercel にログインしてください
echo コマンド: vercel login
echo.
vercel login

echo.
echo Step 2: デプロイを実行します
echo コマンド: vercel --prod
echo.
vercel --prod

echo.
echo ========================================
echo デプロイが完了しました！
echo URLが表示されているはずです。
echo ========================================
pause