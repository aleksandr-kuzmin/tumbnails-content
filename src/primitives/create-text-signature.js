export const createTextSignature = (x, y, width, height, fontSize, fontFamily, color, text) => {
  return {
    "content": {
      "x": x,
      "y": y,
      "type": "signature",
      "owner": 84529657,
      "align": "left",
      "valign": "top",
      "width": width,
      "height": height,
      "subType": "text",
      "bold": false,
      "italic": false,
      "underline": false,
      "fontFamily": fontFamily,
      "fontSize": fontSize,
      "color": color,
      "text": text,
      "dateStamp": "08/04/2020",
      "stamp": {
        "dateTime": {
          "format": "MM/DD/YYYY",
          "text": "08/04/2020"
        },
        "verification": {
          "verifier": "pdffiller",
          "verifierName": "PDFFiller"
        }
      }
    },
    "pageId": 0,
    "group": "tools",
    "type": "signature",
    "subType": "text",
    "enabled": true,
    "initial": true,
    "element": {
      "clientId": 1,
      "localId": 13
    }
  }
}
