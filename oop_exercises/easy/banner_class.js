class Banner {
  constructor(message) {
    this.message = message;
    this.times = this.message.length + 2;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    let star = '+';
    let dash = '-';
    
    return star + dash.repeat(this.times) + star;
  }

  emptyLine() {
    let ini = '|';
    let empty = ' ';
    return ini + empty.repeat(this.times) + ini;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
/*
+--------------------------------------------+
|                                            |
| To boldly go where no one has gone before. |
|                                            |
+--------------------------------------------+
*/

let banner2 = new Banner('');
banner2.displayBanner();
/*
+--+
|  |
|  |
|  |
+--+
*/
