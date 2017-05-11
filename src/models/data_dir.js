// Returns the folder that app data should be place in. Platform specific
// http://stackoverflow.com/a/26227660/120067
export default function data_dir() {
  return (
    // Windows
    process.env.APPDATA ||
    (
      process.platform == 'darwin' ?

        // Mac
        process.env.HOME + '/Library/Preferences' :

        // Linux
        process.env.HOME + "/.local/share"
    )
  )
}
