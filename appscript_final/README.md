Google apps script uses javascript as its implementation language. It interacts
with google services as basically serverless code which has permissions scoped
to the user. The dependency services and permissions for "run-as" are set in
the appsscript.json file, and the code itself is defined in a number of Code.gs
files. A number of settings can control what to do with failures, but a main
consideration is that long running processes will be killed after Google's time
limit.

External to the script file is the app script ecosystem, in which you set
triggers to run the scripts, which largely amounts to a time trigger, in this
case. Apps Scripts are meant to be invoked and do something brief and go away.


