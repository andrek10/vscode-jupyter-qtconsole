'use strict';
import * as vscode from 'vscode';

//Class to keep terminal references, and run IPython commands
class CodeManager_1 {
    //field - initialize constructor .this items
    terminal
    terminal_ahk
    terminalsOpened

    //Constructor
    constructor() {
        this.terminal = null;
        this.terminal_ahk = null;
        this.terminalsOpened = null;
    }

    //Functions
    runPython() {
        // Get current editor
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        
        // Get filename of current file
        var filename = editor.document.fileName;
        
        //Make IPython Command
        var ipyCom = "run ".concat(filename);
        // var ipyCom = "execfile(r\"";
        // ipyCom = ipyCom.concat(filename);
        // ipyCom = ipyCom.concat("\");");

        //Send IPython command
        this.terminal.show();
        this.terminal.sendText(ipyCom, false);

        //Send enterkey via AutoHotKey
        this.terminal_ahk.sendText("sendEnter.ahk", true);
    }
    makeTerminal() {

        // var a = vscode.window.showInputBox({prompt : "Close Terminal? y/n",
        //                                    ignoreFocusOut : true});

        if (this.terminalsOpened == 1) {
            try {
                this.terminal_ahk.dispose()
            }
            catch (e) {
                console.log("Terminal ahkTerminal already closed");
            }

            try {
                this.terminal.dispose()
            }
            catch (e) {
                console.log("Terminal IPython alreacy closed");
            }
        }

        this.terminalsOpened = 1;
        // Make the AutoHotKey terminal
        this.terminal_ahk = vscode.window.createTerminal("ahkTerminal");
        this.terminal_ahk.sendText("cd %HOMEPATH%", true);
        //this.terminal_ahk.sendText("cd ak-ipython\\src")
        this.terminal_ahk.sendText("cd .vscode\\extensions\\vscode-jupyter-qtconsole\\src")

        // Make IPython terminal
        this.terminal = vscode.window.createTerminal("IPython");
        this.terminal.show()
    }
};

//Extension initializer, and command register
export function activate(context: vscode.ExtensionContext) {
    //Make new class instance
    const codeManager = new CodeManager_1();

    //Command to start terminals
    var disposable = vscode.commands.registerCommand('extension.startConsole', () => {
        // vscode.window.showInformationMessage('Starting a console');
        codeManager.makeTerminal();
    });

    //Command to run IPython commands
    var disposable = vscode.commands.registerCommand('extension.runPython', () => {
        codeManager.runPython();
    });

    //Push the functions to VSCode
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}