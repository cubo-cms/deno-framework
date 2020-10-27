/** @file Controller.ts
  * @copyright      2020 Cubo CMS <https://cubo-cms.com/COPYRIGHT.md>
  * @license        MIT license <https://cubo-cms.com/LICENSE.md>
  * @author         Papiando <info@papiando.com>
  **/

import Core from './Core.ts';

/** @class Controller
  * Implements a core class for the framework
  **/
export default class Controller extends Core {
  constructor(data:object = {}) {
    super(data);
  }
}
