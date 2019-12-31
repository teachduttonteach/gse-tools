export function getNameFromEmail(email: string) {
    var name = this.email.split("@")[0].split(".");
    return [name[0].charAt(0).toUpperCase() + name[0].slice(1), name[1].charAt(0).toUpperCase() + name[1].slice(1)];  
  }
  
  