@echo off
setlocal

echo 🔍 Docker Validation Script
echo ==========================

echo.
echo 📋 Checking Dockerfile format and warnings...

:check_dockerfile
set dockerfile=%1
if "%dockerfile%"=="" goto summary

echo.
echo Checking %dockerfile%...

if not exist "%dockerfile%" (
    echo ❌ %dockerfile% not found
    goto next_file
)

echo Running manual checks for %dockerfile%:

REM Check for legacy ENV format
findstr /r "^ENV [A-Z_]* [^=]" "%dockerfile%" >nul 2>nul
if %errorlevel%==0 (
    echo ⚠️  Legacy ENV format found (should use ENV KEY=value)
) else (
    echo ✅ ENV format is correct
)

REM Check for EXPOSE format
findstr /r "^EXPOSE [0-9]*$" "%dockerfile%" >nul 2>nul
if %errorlevel%==0 (
    echo ✅ EXPOSE format is correct
)

REM Check for proper USER usage
findstr /r "^USER " "%dockerfile%" >nul 2>nul
if %errorlevel%==0 (
    echo ✅ USER directive found (good security practice)
) else (
    echo ⚠️  No USER directive found (consider adding for security)
)

:next_file
shift
if not "%1"=="" goto check_dockerfile

:summary
REM Check all Dockerfiles
if exist "Dockerfile" call :check_single_file "Dockerfile"
if exist "Dockerfile.dev" call :check_single_file "Dockerfile.dev"
if exist "Dockerfile.secure" call :check_single_file "Dockerfile.secure"

echo.
echo 🎯 Docker Best Practices Summary:
echo =================================
echo ✅ Use ENV KEY=value format (not ENV KEY value)
echo ✅ Use non-root USER for security
echo ✅ Use .dockerignore to reduce build context
echo ✅ Use multi-stage builds for smaller images
echo ✅ Use specific base image versions
echo ✅ Clean up package cache in single RUN layer

echo.
echo 🏗️  To build without warnings:
echo docker build -t todo-app .
echo.
echo 🔧 To see detailed build info:
echo docker build --progress=plain -t todo-app .

goto end

:check_single_file
set dockerfile=%~1
echo.
echo Checking %dockerfile%...

if not exist "%dockerfile%" (
    echo ❌ %dockerfile% not found
    goto :eof
)

echo Running manual checks for %dockerfile%:

findstr /r "^ENV [A-Z_]* [^=]" "%dockerfile%" >nul 2>nul
if %errorlevel%==0 (
    echo ⚠️  Legacy ENV format found
) else (
    echo ✅ ENV format is correct
)

findstr /r "^USER " "%dockerfile%" >nul 2>nul
if %errorlevel%==0 (
    echo ✅ USER directive found
) else (
    echo ⚠️  No USER directive found
)

goto :eof

:end