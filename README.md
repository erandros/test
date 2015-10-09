Publishing
====
To update the live version, a published needs to be done. For example, to update the dev version we have to follow these steps:

  * Log into .79 server
  * Go to `C:\inetpub\wwwroot\ViperTest\git`
  * `git pull` the desired branch (`central` remote references the `demand/viper` site)
  * Stop the ViperTest site in IIS.
  * Run the `publish.ps1`PowerShell script.
  * Start the ViperTest site in IIS.