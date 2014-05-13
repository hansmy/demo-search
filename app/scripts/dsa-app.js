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
 /*******************************************************************************
 * Copyright (c) OpenSource Connections LLC, and contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
/*!
  Dsa – App
  ==============================
  Simple Search Results with EmberJS
*/

// Define Ember Application
var DSApp = window.DSApp = Ember.Application.create();

// App Scripts
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');



/*  
## POINTING TO SOLR 
*/

DSApp.searcher = Dsa.SolrSearcher.create({

  // Point this value to your Solr instance
  url: "http://localhost:8983/solr/collection1/select",
  
  params: {

    // Edit this value to include the fields that you want to return
    "fl": "title,id,path,when,icon,size,mime_type,keywords",
    "defType" : "edismax",
    "qf" : "title^2 text attr_content",
    "hl" : "on",
    "hl.fl" : "*", 
    "indent":true,

    // Optionally uncomment the next three lines to include facets, and change the `facet.field` value to match your fields
    "facet": true,
    "facet.field": ["icon","keywords"],
    "facet.limit": 20,

    "q": {},
    "fq": [],
    "start": 0,
    "rows": 10,
    "wt": "json"
  },
  success: function (data) {},
  selectedFacets: Em.ArrayController.create({
    content: ["icon","keywords"]
  })
});


/* 
## FACET GROUPS

Optionally, create a unique FacetGroup for each facet list 
that you will include in your application.

For example: 

````js

DSApp.facetGroup1 = Dsa.FacetGroup.extend({
searcher: DSApp.searcher,
  fieldName: 'abstract_en',
  displayName: 'Abstract'
});

````
*/

DSApp.textFacetGroup = Dsa.TextFacetGroup.extend({
  searcher: DSApp.searcher,
  fieldName: 'abstract_en',
  displayName: 'Abstract'
});


/*  
## YOU'RE DONE HERE.

Great, you've set up your application, now it is time to define how your results are output in the `index.html` file. 


/*  SEARCH BOX
==============================*/

DSApp.searchInput = Dsa.SearchBox.extend({
  searcher: DSApp.searcher
});

DSApp.searchSubmit = Dsa.SearchSubmit.extend({
  searcher: DSApp.searcher
});


/*  RESULTS
==============================*/

DSApp.results = Dsa.ResultSet.extend({
  // templateName: 'results',
  searcher: DSApp.searcher,
  highlights:true
});



/*  FILTERS
==============================*/
// DSApp.searcher.selectedFacets = Dsa.SelectedFilters;


$(document).ready(function(){

    /* # Show spinner untill everything's loaded. */
    $('.spinner').show();

    
    /* # Open/close menu. */
  $('.nav-control').click(function(){
    $('body').toggleClass('nav-open');
  });

    /* Make specific links open in a new window in a HTML5 valid way */
  $('a[rel*="external"]').click(function(){
    $(this).attr('target', '_blank');
  })
  
    

  
});

$(window).load(function(){

    /* # All loaded, hide spinner. */
  $('.spinner').hide();

});