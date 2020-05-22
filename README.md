# vscode-jupyter-qtconsole

DISCONTINUED --- Use vscode-ipython-console instead

Run Python code in a Jupyter QTconsole embedded in VSCode. Extension. 
Supports only Windows at the moment, and requires AutoHotKey installed.
Tested to work on a standard Anaconda python installation.

# Quickstart:
There are two commands embedded in the extension:

1] "Start Jupyter QTConsole" - Starts three CMD terminals, each with a different purpose:
	1) "ahkTerminal" simulates an enter-key (yeah, really), when a python file is run.
	2) "qtConsole" starts a local Jupyter QTConsole kernel in a separate window.
	3) "Console" connects to the existing QTConsole, and is the embedded python interface in VSCode. All python code is run here.
	
2] "Run the Python file" - Runs the python file that is open in the editor, and in focus. It calls a python function 'execfile(<filepath>)' where <filepath> is the full path to the opened .py file. 

# Notes:

One issue is that the jupyter console does not parse newline (\n) or carriage return (\r) as an enter key. It simply adds a new line, and waits for more commands to be executed successively. AutoHotKey is required to simulate an ENTER keypress after 'execfile(<filepath>)' is printed to the "Console" CMD. If the ENTER key is not pressed after running the second command 2], please check the terminal "ahkTerminal" for any errors. 

Secondly, the "Console" CMD is executing 6 pings to the localhost, with 1 second pause between each ping. This is a way to pause execution, allowing the Jupyter QTConsole to fully start before the Jupyter Console connects to it. If the pause is too short (or too long), please modify the source code to add/remove pings. 
