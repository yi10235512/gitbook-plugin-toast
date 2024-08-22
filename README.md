# gitbook-plugin-toast 

A GitBook plugin that provides toast notifications to announce updates on each page.

Configure your `book.json` as follows:
```json
{
  "plugins": ["toast"],
  "pluginsConfig": {
    "toast": {
      "content": "Hello toast!",
      "showClose": true 
    }
  }
}
```
