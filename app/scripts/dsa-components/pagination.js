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


// Dsa.Pagination = Dsa.SearcherObserver.extend({
//   searcher: null,
//   templateName: 'pagination',
//   totalPages: 0,
//   getTotalPages: function () {
//     try {
//       this.set('totalPages', Math.ceil(this.searcher.getNumFound() / this.searcher.resultsPerPage));
//     }
//     catch (error) {
//     }
//   },
//   pages: [],
//   currentPage: null,
//   update: function () {
//     var self = this;
//     var resultsPerPage = self.searcher.resultsPerPage;
//     self.set('currentPage', Math.ceil((self.searcher.params.start + resultsPerPage) / resultsPerPage));
//     var pages = [];
//     self.getTotalPages();
//     for (var i = 1; i <= self.totalPages; i++) {
//       var page = {};
//       page.num = i;
//       page.loadNext = function () {
//         self.set('currentPage', this.num);
//         self.searcher.loadNextResults((this.num - 1) * resultsPerPage, resultsPerPage);
//       };
//       pages.push(this.pageNumView.create(page));
//     }
//     self.set('pages', pages);
//   },
//   pageNumView: Em.View.extend({
//     template: Em.Handlebars.compile('{{num}} '),
//     tagName: 'span',
//     classNames: ['page-num'],
//     click: function (e) {
//       e.preventDefault();
//       e.stopPropagation();
//       this.loadNext();
//     }
//   })
// });

// Ember.TEMPLATES.pagination = Em.Handlebars.compile('\
//   {{#if view.currentPage}}{{view.currentPage}} | {{/if}}{{#each view.pages }}{{view this}}{{/each}}\
// ');