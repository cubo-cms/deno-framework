/** @file Core.ts
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  **/

type Constructor<Self> = { new ():Self };

/** @class Core
  * Implements a core class for the framework
  **/
export default class Core {
  /** @protected caller - the class that created this class
    **/
  protected caller:object = {};

  /** @protected name - the class name
    **/
  protected name:string = this.constructor.name;

  /** @protected data - where class data is stored
    **/
  protected data:any = {};

  /** @constructor (data)
    * Initializes the class with data from an object or a URI
    * @param data {string|object}
    **/
  constructor(data:object = {}) {
    this.data = data;
  }

  /** @function create(dataType,data,caller)
    * Creates an object for specified data type
    * @param data {string|object}
    * @param caller {object}
    * @return {object}
    **/
  static create<Self extends Core>(instance:new(data:object)=>Self, data:object, caller:object = {}):Self {
    const object = new instance(data);
    object.caller = caller;
    return object;
  }

  /** @function get(property,defaultValue)
    * Returns a class property
    * @param property {string}
    * @param defaultValue {any}
    * @return {any}
    **/
  get(property:string, defaultValue?:any):any {
    return this.data[property] || defaultValue;
  }

  /** @function has(property)
    * Returns true if property exists
    * @param property {string}
    * @return {boolean}
    **/
  has(property:string):boolean {
    return this.data[property] !== undefined;
  }

  /** @async @function load(data)
    * Loads class data from an object or a URI
    * @param data {string|object}
    * @return {object}
    **/
  async load<Self>(data:string|object = {}):Promise<Self> {
    return new Promise((resolve:any, reject:any) => {
      if(typeof data === 'string') {
        Core.load(data).then((data) => resolve(this.data = data));
      } else {
        resolve(this.data = data);
      }
    });
  }

  /** @async @function merge(data)
    * Merges class data with data from an object or a URI
    * @param data {string|object}
    * @return {object}
    **/
  async merge<Self>(data:string|object = {}):Promise<Self> {
    return new Promise((resolve:any, reject:any) => {
      if(typeof data === 'string') {
        Core.load(data).then((data) => resolve(Object.assign(this.data, data)));
      } else {
        resolve(Object.assign(this.data, data));
      }
    });
  }

  /** @function set(property,value,defaultValue)
    * Returns a class property
    * @param property {string}
    * @param value {any}
    * @param defaultValue {any}
    * @return {any}
    **/
  set(property:string,value:any,defaultValue?:any):any {
    return this.data[property] = value || defaultValue;
  }

  /** @function toJSON()
    * Returns the class data
    * @return {object}
    **/
  toJSON():object {
    return this.data;
  }

  /** @function toString()
    * Returns name of the class
    * @return {string}
    **/
  toString():string {
    return this.name;
  }

  /** @static @function isURL(data)
    * Returns true if data is a URL
    * @param data {string}
    * @return {boolean}
    **/
  static isURL(data:string):boolean {
    const URLtester = /^[\w\-\+_]+:.+/g;
    return URLtester.test(data);
  }

  /** @static @async @function load(data)
    * Returns loaded data from an object or a URI
    * @param data {string|object}
    * @return {object}
    **/
  static async load<Self>(data:string|object):Promise<Self> {
    return new Promise((resolve:any, reject:any) => {
      if(typeof data === 'string') {
        if(this.isURL(data)) {
          fetch(data)
            .then((data) => resolve(data.json()))
            .catch((error) => resolve({}));
        } else {
          Deno.readTextFile(data)
            .then((data) => resolve(JSON.parse(data)))
            .catch((error) => resolve({}));
        }
      } else {
        resolve(data);
      }
    });
  }
}
