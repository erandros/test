appcmd stop sites "ViperTest"
appcmd recycle apppool "ViperTest"
dnu restore src\viper\

dnu publish src\viper\ -o "..\build\" --runtime active
appcmd start sites "ViperTest"