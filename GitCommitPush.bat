@echo off
set /p var=Commit message : 
IF NOT ["%var%"]==[] (
	ECHO GIT ADD
	git add .
	ECHO GIT COMMIT
	git commit -am "%var%"
	ECHO GIT STATUS
	git status
	ECHO GIT PUSH
	git push -u --force origin master
	ECHO GIT STATUS
	git status
) ELSE (
	ECHO Fill the commit message!
)
PAUSE