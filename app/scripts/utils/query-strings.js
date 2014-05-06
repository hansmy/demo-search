/*******************************************************************************
 * Copyright (c) 2014 AmbieSense Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
// Query Parsing
Dsa.Utils.parseQueryString = function(queryString) {
  var queryArray = queryString.split('&');
  var obj = {}

  for (var i = 0; i < queryArray.length; i++) {
    var valuePairs = queryArray[i].split('='),
        key = decodeURI(valuePairs[0]),
        value;

    if (key === 'fq') {
      value = this.parseFqString(valuePairs[1]);
    } 
    else {
      value = decodeURI(valuePairs[1]);
    }

    obj[key] = value;
  }

  return obj;
};

Dsa.Utils.returnSearchHash = function(q, facets, sort) {
  var urlArray = [];
  
  if (q && q !== '') {
    urlArray.push('q=' + q.toString());
  }
  
  if (facets && facets !== '') {
    urlArray.push('fq=' + facets.replace(/\//g, '::'));
  } 

  if (sort && sort !== '') {
    urlArray.push('sort=' + sort);
  } 

  return encodeURI(urlArray.join('&'));
};

Dsa.Utils.parseFqString = function(fqString) {
  // console.log('fqString', fqString);

  var fqArray = decodeURIComponent(fqString.toString()).replace(/\::/g, '/').split(','),
      obj = {},
      r = new RegExp("[:]+(?![^[]*])");

  console.log('fqArray', fqArray);

  for (var i = 0; i < fqArray.length; i++) {
    var s = fqArray[i].split(r),
        key = s[0],
        value = s[1] ? s[1] : false;
    
    if (!value) {
      return;
    }

    if (obj[key]) {
      var currentValue = obj[key];

      if (!Array.isArray(currentValue)) {
        obj[key] = [currentValue, value];
      }
      else {
        obj[key].push(value);
      }
    }
    else {
      obj[key] = value;
    }
  }

  // console.log("fqString obj", obj);
  return obj;
};
