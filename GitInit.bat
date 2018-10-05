@echo off
ECHO Repository Address : 
set /p var=
IF NOT "%var%" equ "" (
	ECHO GIT INIT
	git init
	ECHO GIT ADD ORIGIN
	git remote add origin "%var%"
	ECHO FIRST COMMIT
	call GitCommitPush.bat
) ELSE (
	ECHO Need an repository address!
)
PAUSE