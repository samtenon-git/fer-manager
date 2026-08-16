' Lance smart-start-hidden.bat sans aucune fenêtre visible
Set objShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
objShell.Run "cmd /c """ & strPath & "\smart-start-hidden.bat""", 0, False
