export function safeGet(obj: object, prop: string): any{
    return Object.assign({}, obj)[prop] || '';
  }

export function toObjectId(baseId = '5951bc91860d8b5ba', mysqlId = 1) {
    const oldId = mysqlId.toString(10);
    const a = '0'.repeat(7 - oldId.length);
    return baseId + a + oldId;
}

export function pmtName(mysqlId) {
    if (mysqlId) {
        const oldId = mysqlId.toString(10);
        const a = '0'.repeat(4 - oldId.length);
        return a + oldId;
    }
    return mysqlId;
}

// *****************************************************
// ***********    DATE FUNCTIONS   *********************
// *****************************************************


export function timestamp() {
    return `${new Date().toISOString().slice(0, 22)}Z`;
    //   return new Date().toISOString().slice(0, 19).replace("T", " ")+"Z";
}

export function dateDaysAgo(since = 0) {
    const today = new Date();
    today.setDate(today.getDate() - since);
    return today.toISOString();
}

export function  formatDate(date) {
    return new Date(date).toDateString();
}

export function  formatTime(time) {
    return new Date(time).toLocaleTimeString();
}

export function timeSince(date) {
    if(!date) return 'Null';
    const now = Number(new Date());
    const then = Number(new Date(date));
    const seconds = Math.floor((now - then) / 1000);
  
    let interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

/**
 * functions returns the date of 
 * @param d How many days ahead
 * @param givenDate Date counting from
 */
export function nextDate(d = 1, givenDate = new Date().toISOString()) {
    return new Date(new Date(givenDate).setDate(new Date(givenDate).getDate() + d));
}

function daysIntoYear(date = new Date()) {
    // eslint-disable-next-line max-len
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}


export function randomNum() {
    return Math.floor(Math.random() * 1000000);
}

export function cloneObject(model = {}, source) {
    return Object.assign(model, source);
}

/**
 * @description getObjectByKey returns the object from an Array of
 * Objects that has the key with a given value or undefined!
 * @param {Array} arrayObject Array of Objects
 * @param {String} key Object key could be a String or Integer
 * @param {String} value Object value could be a String or Integer
 */
export function getObjectByKey(arrayObject, key, value) {
    return arrayObject.find(obj => obj[ key ] === value);
}


/**
 * @description addToArrayOfObjects add a new object item to an array of objects
 * @param {Object} arrayOfObjects the array of object
 * @param {Number} limit maximum number of objects the array should not exceed
 * @param {Object} newObjectElement the new item to be added to the array of objects
 * @returns {Object} the new array of Objects
 */
export function addToArrayOfObjects(arrayOfObjects, limit, newObjectElement) {
    const size = Object.keys(arrayOfObjects).length;
    if (size < limit) {
        arrayOfObjects.push(newObjectElement);
    } else {
    // arr.splice(indexToRemove, numToRemove)
        arrayOfObjects.splice(0, 1);
        arrayOfObjects.push(newObjectElement);
    }
    return arrayOfObjects;
}

/**
 * @description getClientAccess get the Ip Address and TimeSTamp of a request object.
 * @param {String} req the request object
 * @returns {Object} { accessDate, ipAddress } access date and the ip address
 */
export function getClientAccess(req) {
    const ipAddress = req.ip || req.RemoteAddress;
    // const lang = req.get("accept-language");
    const accessDate = req.StartTime || '';
    return { accessDate, ipAddress };
}

export function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isObjecId(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
    return false;
}

/**
 * @returns a five-digit random number
 */
export function generateOtp() {
    const num = Math.floor(Math.random() * 90000) + 10000;
    return num;
}


export function cleanDeepObject(obj) {
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            cleanDeepObject(obj[ propName ]);
        }
    }
    return obj;
}

let depth = 0;

// eslint-disable-next-line complexity
export function cleanObject(obj) {
    depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (depth <= 3) cleanObject(obj[ propName ]);
        }
    }
    return obj;
}

function genString(length, seed= 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789') {
    let text = '';
    for (let i = 0; i < length; i++) {
        text += seed.charAt(Math.floor(Math.random() * seed.length));
    }
    return text;
}

export function genCode(len = 9) {
    let d = new Date().getFullYear().toString().substr(-2);
    d += daysIntoYear();
    if (len - d.length > 0) {
        return d + genString(len - d.length);
    }
    return genString(len);
}

export function generateShipmentCode(terminalId, len = 10) {
    let d = new Date().getFullYear().toString().substr(-1);
    d += daysIntoYear();
    d += terminalId.substr(-2);
    if (len - d.length > 0) {
        return d + genString(len - d.length, "0987654321");
    }
    return genString(len, "0987654321");
}

export function hasNull(Obj = {}) {
    const val = Object.values(Obj);
    if (val.includes(null) || val.includes(undefined) || val.includes('')) return true;
    return false;
}

/**
 * @description Set a local storage value with expired date, if expires is not set
 * 24 hours will be set
 * @param {String} name name (key) of the local storagr value
 * @param {any} value value to associate with the name
 * @param {Number} expires number of hours that the key will be available
 */
export function setLocalStorage(name, value, expires) {
    if (expires === undefined || expires === null) {
        expires = (12*60*60);
    } else {
        expires = Math.abs(expires);
    }

    const now = Date.now();
    const schedule = now + expires * 1000;
    try {
        if (typeof value === 'string' || typeof value === 'number') {
            window.localStorage.setItem(name, `${value}`);
        } else {
            window.localStorage.setItem(name, JSON.stringify(value));
        }
        window.localStorage.setItem(`${name}ExpiresIn`, schedule.toString(10));
        return true;
    } catch(e) {
        console.log('Error: ' + e);
        return false;
    }
}

/**
 *
 * @param {String} name name (key) to retrieve the data set
 */
export function getLocalStorage(name) {
    const now = Date.now();

    let expiresIn = parseInt(window.localStorage.getItem(`${name}ExpiresIn`), 10);
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) {
        removeLocalStorage(name);
        return null;
    } else {
        if (propsExist(name, window.localStorage)) {
            const getItem = window.localStorage.getItem(name);
            try {
                return JSON.parse(getItem);
            } catch (e) {
                return getItem;
            }
        } else {
            return false;
        }
    }
}

/**
 *
 * @param {String} name name (key) to be remove
 */
export function removeLocalStorage(name) {
    try{
        window.localStorage.removeItem(name);
        window.localStorage.removeItem(`${name}ExpiresIn`);
    } catch (e) {
        console.log('Error: ', e);
        return false;
    }
    return true;
}


/**
 *
 * @param {String} name
 * @param {Object} objectData
 */
export function propsExist(name, objectData) {
    return Object.prototype.hasOwnProperty.call(objectData, name);
}


export function getSettings(arrObj: Array<any>, value: string) {
    if ( Object.keys(arrObj).length > 1 && arrObj) {
        const Obj = arrObj.find(item => item.name === value);
        return (Obj && safeGet(Obj, 'value')) ? Obj.value : null;
    }
    return null;
}

export function getFullname(record: any): string{
    if(!record) return '';
    const title = hasProp(record, 'title') ? record.title : '';
    const gender = hasProp(record, 'gender') ? `(${record.gender.charAt(0).toLowerCase()})` : '';
    const surname = hasProp(record, 'surname') ? record.surname : '';
    const otherName = hasProp(record, 'otherName') ? record.otherName : '';
    return (titleCase(title + ' ' + surname + ' ' + otherName) + ' ' + gender).trim();
}

  /**
 * @param name  property name
 * @param objectData Data
 */
function propsAvailable(name, objectData) {
    return Object.prototype.hasOwnProperty.call(objectData, name);
}
// tslint:disable-next-line:no-shadowed-constiable
export function propExist(obj, props, depth: number, max: number) {
    // props[depth] is each array of properties to check in the object
    // obj[props[depth]] Get the value of the props
    const exist = isEmpty(obj) ? false : propsAvailable(props[depth], obj);
    // Check if the propert exist in the object
    if (!exist) {
        //  if it does not exist return false
        return false;
    }
    const newObj = obj[props[depth]];
    // Go to the child property
    const newDepth = depth + 1;
    // If the depth is attain return false
    // Else check if the child property exist
    return newDepth === max ? true : propExist(newObj, props, newDepth, max);
}

export function isEmpty(val, str = false) {
    let empty  = val === null || val === undefined;
    if (!empty && str === true) {
        empty = val.trim() === '';
    }
    return empty;
}

export function deepPropsExist(obj, ...props) {
    // tslint:disable-next-line:no-shadowed-constiable
    const depth = props.length;
    return propExist(obj, props, 0, depth);
}

export function getObjValue(obj, props, depth, max) {
    // props[depth] is each array of properties to check in the object
    // obj[props[depth]] Get the value of the props
    const exist = isEmpty(obj) ? false : propsAvailable(props[depth], obj);
    // Check if the propert exist in the object
    if (!exist) {
        //  if it does not exist return false
        return null;
    }
    const newObj = obj[props[depth]];
    // Go to the child property
    const newDepth = depth + 1;
    // If the depth is attain return false
    // Else check if the child property exist
    return newDepth === max ? newObj : getObjValue(newObj, props, newDepth, max);
}

export function getDeepObjValue(obj, ...props) {
    // tslint:disable-next-line:no-shadowed-constiable
    const max = props.length;
    return getObjValue(obj, props, 0, max);
}

export function isEqual(value, other) {
    // Get the value type
    const type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) {
        return false;
    }

    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
        return false;
    }

    // Compare the length of the length of the two items
    const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
        return false;
    }

    // Compare properties
    if (type === '[object Array]') {
        for (let i = 0; i < valueLen; i++) {
            if (compare(value[i], other[i]) === false) {
                return false;
            }
        }
    } else {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                if (compare(value[key], other[key]) === false) {
                    return false;
                }
            }
        }
    }

    // If nothing failed, return true
    return true;

}

// Compare two items
function compare(item1, item2) {

    // Get the object type
    const itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
        if (!isEqual(item1, item2)) {
            return false;
        }
    } else { // Otherwise, do a simple comparison

        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) {
            return false;
        }

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === '[object Function]') {
            if (item1.toString() !== item2.toString()) {
                return false;
            }
        } else {
            if (item1 !== item2) {
                return false;
            }
        }
    }
    return true;
}

export function titleCase(str: string): string {
    return str.toLowerCase().split(' ').map(function(word) {
        return (word.trim().charAt(0).toUpperCase() + word.slice(1));
      }).join(' ');
    }

    //   primary info success danger  warning default
export function setClass(status: string): string {
        let style = 'default';
        if(!status) return style;
        switch(status) {
          case 'PENDING': style = 'danger'; break;
          case 'RAISED': style = 'danger'; break;
          case 'STORED': style = 'primary'; break;
          case 'APPROVED': style = 'info'; break;
          case 'TRANSIT': style = 'info'; break;
          case 'SHIPPED': style = 'info'; break;
          case 'FORWARDING': style = 'danger'; break;
          case 'RECEIVING': style = 'info'; break;
          case 'DELIVERED': style = 'success'; break;
          case 'DISPATCHED': style = 'success'; break;
          case 'SUCCESSFUL': style = 'success'; break;
          case 'ARRIVED': style = 'success'; break;
          case 'PAID': style = 'success'; break;
          case 'REJECTED': style = 'danger'; break;
          case 'FAILED': style = 'danger'; break;
          case 'ACKNOWLEDGED': style = 'info'; break;
          case 'ENDORSED': style = 'primary'; break;
          case 'AUTHORIZED': style = 'info'; break;
          case 'APPROVED': style = 'success'; break;
          case 'CHECKED': style = 'warning'; break;
          case 'PAID': style = 'success'; break;
          case 'AUDITED': style = 'default'; break;
          case 'CLOSED': style = 'default'; break;
          case 'RAISE': style = 'success'; break;
          case 'ACKNOWLEDGEMENT': style = 'info'; break;
          case 'ENDORSEMENT': style = 'primary'; break;
          case 'AUTHORIZATION': style = 'info'; break;
          case 'APPROVAL': style = 'success'; break;
          case 'CHECKING': style = 'warning'; break;
          case 'PAYMENT': style = 'success'; break;
          case 'AUDITING': style = 'default'; break;
          case 'CLOSING': style = 'default'; break;
          default: style = 'default';
        }
        return style;
      }