var app = angular.module('app', ["ui.bootstrap", "ui.select", "formio", "ngFormBuilder", "ngJsonExplorer", "jkAngularRatingStars","angucomplete-alt","ng1UserPanel"])
app.controller('formBuilderCtrl', [
    "$scope",
    'formioComponents',
    '$timeout',
    '$http',
    '$rootScope',
    function(
        $scope,
        formioComponents,
        $timeout,
        $http,
        $rootScope
    ) {
        $scope.displays = [{
            name: 'form',
            title: 'Form'
        }, {
            name: 'wizard',
            title: 'Wizard'
        }];
        // $scope.rating = 3;
        $scope.rating = {};
        $scope.selectedUser = {};
        $scope.form = {
            components: [{
                input: true,
                tableView: true,
                inputType: 'text',
                inputMask: '',
                label: 'First Name',
                key: 'firstName',
                placeholder: 'Enter your first name',
                prefix: '',
                suffix: '',
                multiple: false,
                defaultValue: '',
                protected: false,
                unique: false,
                persistent: true,
                validate: {
                    required: false,
                    minLength: '',
                    maxLength: '',
                    pattern: '',
                    custom: '',
                    customPrivate: false
                },
                conditional: {
                    show: false,
                    when: null,
                    eq: ''
                },
                type: 'textfield'
            }, {
                input: true,
                tableView: true,
                inputType: 'text',
                inputMask: '',
                label: 'Last Name',
                key: 'lastName',
                placeholder: 'Enter your last name',
                prefix: '',
                suffix: '',
                multiple: false,
                defaultValue: '',
                protected: false,
                unique: false,
                persistent: true,
                validate: {
                    required: false,
                    minLength: '',
                    maxLength: '',
                    pattern: '',
                    custom: '',
                    customPrivate: false
                },
                conditional: {
                    show: false,
                    when: null,
                    eq: ''
                },
                type: 'textfield'
            }, {
                type: 'select',
                validate: {
                    required: false
                },
                clearOnHide: true,
                persistent: true,
                unique: false,
                protected: false,
                multiple: true,
                template: '<span>{{ item.label }}</span>',
                authenticate: false,
                filter: '',
                refreshOn: '',
                defaultValue: '',
                valueProperty: '',
                dataSrc: 'values',
                data: {
                    custom: '',
                    resource: '',
                    url: '',
                    json: '',
                    values: [{
                            label: 'Raindrops on roses',
                            value: 'raindropsOnRoses'
                        },
                        {
                            label: 'Whiskers on Kittens',
                            value: 'whiskersOnKittens'
                        },
                        {
                            label: 'Bright copper kettles',
                            value: 'brightCopperKettles'
                        },
                        {
                            label: 'Warm woolen Mittens',
                            value: 'warmWoolenMittens'
                        },
                        [

                        ]
                    ]
                },
                placeholder: 'Select a few',
                key: 'favoriteThings',
                label: 'Favorite Things',
                tableView: true,
                input: true
            }, {
                input: true,
                tableView: true,
                label: 'Message',
                key: 'message',
                placeholder: 'What do you think?',
                prefix: '',
                suffix: '',
                rows: 3,
                multiple: false,
                defaultValue: '',
                protected: false,
                persistent: true,
                validate: {
                    required: false,
                    minLength: '',
                    maxLength: '',
                    pattern: '',
                    custom: ''
                },
                type: 'textarea',
                conditional: {
                    show: false,
                    when: null,
                    eq: ''
                }
            }, {
                type: 'button',
                theme: 'primary',
                disableOnInvalid: true,
                action: 'submit',
                block: false,
                rightIcon: '',
                leftIcon: '',
                size: 'md',
                key: 'submit',
                tableView: false,
                label: 'Submit',
                input: true
            }],
            display: 'form'
        };

        $scope.submission = { data: {} };
        // $scope.submission = {};
        console.log($scope.submission);
        $scope.renderForm = true;
        $scope.$on('formUpdate', function(event, form) {
            console.log(form);
            angular.merge($scope.form, form);
            $scope.renderForm = false;
            setTimeout(function() {
                $scope.renderForm = true;
            }, 10);
        });
        $scope.$watch('rating', function(val) {
            console.log(val);
            if(val!=undefined){                
                $scope.rating = val;         
                console.log($scope.submission);                
            }
        });

        // $scope.$watch('selectedUser', function(val) {
        //     console.log(val);
        //     if(val!=undefined){
        //         $scope.selectedUser = {};
        //         $scope.selectedUser = val;  
        //         console.log($scope.selectedUser);   
        //         // $scope.submission = { data: { selectedUser: val } };    
        //         console.log($scope.submission.data);             
        //     }         
        // });
        $scope.selectedUser = function(selected) {
              if (selected) {
                console.log(selected);
                window.alert('You have selected ' + selected);
                console.log($scope.form);
                $scope.selected = selected;                
            } else {
                console.log('cleared');
            }
        };
        $scope.$on('formSubmission', function(err, submission) {
            var submission = submission;
            console.log("Saved");
            console.log($scope.form);
            console.log($scope.selected);
            console.log($scope.rating);            
            submission.selectedUser = $scope.selected;
            submission.rating = $scope.rating;
            console.log(submission);
            console.log($scope.formId);
            var data = {};
            data.formId = $scope.formId;
            data.formname = $scope.formname;
            data.formStructure = JSON.stringify($scope.form, undefined, 2);
            data.formData = JSON.stringify(submission, undefined, 2);
            // data.selectedUser = $scope.selectedUser;
            // data.rating = $scope.rating;
            var url = 'http://localhost:8080/api/v1/formresponses';
            $http({
                method: 'POST',
                url: url,
                data: data
            }).then(function success(response) {
                console.log(response);
                alert("Saved NEW FORM RESPONSE");
            });

        });

        // $scope.$on('submissionLoad', function(err, submission) {
        //     console.log("Saved");
        //     console.log($scope.form);
        //     console.log(submission);
        // });

        $scope.saveForm = function(formJson, formname) {
            console.log(formJson);
            var data = {};
            data.formname = formname;
            data.formStructure = JSON.stringify(formJson, undefined, 2);
            data.formData = "";
            // var userListUrl = 'http://localhost:8000/model/views/tasksaggr/';
            var url = 'http://localhost:8080/api/v1/formbuilder';
            // $http.post(url,data).success(function(response) {
            //   console.log(response);
            // });
            $http({
                method: 'POST',
                url: url,
                data: data
            }).then(function success(response) {
                console.log(response);
                alert("Saved NEW FORM");
                $scope.getForms();
            });
            // $.ajax({
            //   url: url,
            //   type: 'POST',
            //   data: data,
            //   beforeSend: function(request) {
            //     // request.setRequestHeader("x-access-token", $rootScope.user.token.token);
            //     // request.setRequestHeader("x-key", $rootScope.user._id);
            //   },
            //   error: function(err) {
            //     console.log(err);
            //   },
            //   success: function(res) {
            //     console.log(res);
            //   }
            // });
        }
        $scope.list = [];
        $scope.getForms = function() {
            var url = 'http://localhost:8080/api/v1/formbuilder';
            $.ajax({
                url: url,
                type: 'GET',
                beforeSend: function(request) {
                    // request.setRequestHeader("x-access-token", $rootScope.user.token.token);
                    // request.setRequestHeader("x-key", $rootScope.user._id);
                },
                error: function(err) {
                    console.log(err);
                },
                success: function(res) {
                    console.log(res);
                    $scope.list = res;
                }
            });
        }

        $scope.getForms();

        $scope.loadForm = function(form) {
            $scope.submission = { data: {} };
            $scope.form = JSON.parse(form.formStructure);
            $scope.formname = form.formname;
            $scope.formId = form._id;
            console.log($scope.form);
            $scope.getFormResponses($scope.formId);
        }

        $scope.showFormData = function(formtd) {
            $scope.form = formtd.formStructure;
            console.log(formtd.formData);
            $scope.submission = formtd.formData;
            console.log($scope.submission);
        }

        $scope.getFormResponses = function(formId) {
            console.log(formId);
            var url = 'http://localhost:8080/api/v1/formresponses/' + formId;
            $.ajax({
                url: url,
                type: 'GET',
                beforeSend: function(request) {
                    // request.setRequestHeader("x-access-token", $rootScope.user.token.token);
                    // request.setRequestHeader("x-key", $rootScope.user._id);
                },
                error: function(err) {
                    console.log(err);
                },
                success: function(res) {
                    $scope.listFormResponses = [];
                    console.log(res);
                    if (res.length != 0) {

                        for (var i = 0; i < res.length; i++) {
                            $scope.listFormResponses.push({
                                'formStructure': JSON.parse(res[i].formStructure),
                                'formData': JSON.parse(res[i].formData),
                                'formId': res[i].formId,
                                'formname': res[i].formname
                            })
                        }
                        console.log($scope.listFormResponses);
                        // var res = res;
                        // res.formStructure = JSON.parse(res.formStructure);
                        // res.formData = JSON.parse(res.formData);
                        // $scope.listFormResponses = res;
                        // console.log($scope.listFormResponses);
                    }
                }
            });
        }

        var originalComps = _.cloneDeep($scope.form.components);
        originalComps.push(angular.copy(formioComponents.components.button.settings));
        $scope.jsonCollapsed = true;
        $timeout(function() {
            $scope.jsonCollapsed = false;
        }, 200);
        var currentDisplay = 'form';

        $scope.$watch('form.display', function(display) {
            if (display && (display !== currentDisplay)) {
                currentDisplay = display;
                if (display === 'form') {
                    $scope.form.components = originalComps;
                } else {
                    $scope.form.components = [{
                        type: 'panel',
                        input: false,
                        title: 'Page 1',
                        theme: 'default',
                        components: originalComps
                    }];
                }
            }
        });
    }
]);
app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
        var isNumeric = function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        formioComponentsProvider.register('fivestar', {
            title: 'Five Star',
            template: 'formio/components/fivestar.html',
            settings: {
                input: true,
                tableView: true,
                inputType: 'number',
                label: '',
                key: 'numberField',
                placeholder: '',
                prefix: '',
                suffix: '',
                defaultValue: 0,
                protected: false,
                persistent: true,
                validate: {
                    required: false,
                    min: '',
                    max: '',
                    step: 'any',
                    integer: '',
                    multiple: '',
                    custom: ''
                }
            },
            controller: ['$scope', function($scope) {
                // Implement logic here...
                console.log($scope)
            }]
        });
    }
]);

app.run([
    '$templateCache',
    'FormioUtils',
    function($templateCache, FormioUtils) {
        $templateCache.put('formio/components/fivestar.html', FormioUtils.fieldWrap(
            '<div layout="column" ng-controller="formBuilderCtrl"><jk-rating-stars rating="rating" ></jk-rating-stars><div style="width: 100px">{{rating}} Stars</div></div>'
        ));
    }
]);

app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
        formioComponentsProvider.register('fivestar', {
            icon: 'fa fa-star',
            views: [{
                    name: 'Display',
                    template: 'formio/components/fivestar/display.html'
                },
                {
                    name: 'Validation',
                    template: 'formio/components/fivestar/validate.html'
                },
                {
                    name: 'API',
                    template: 'formio/components/common/api.html'
                },
                {
                    name: 'Layout',
                    template: 'formio/components/common/layout.html'
                },
                {
                    name: 'Conditional',
                    template: 'formio/components/common/conditional.html'
                }
            ]
        });
    }
]);
app.run([
    '$templateCache',
    function($templateCache) {
        // Create the settings markup.
        $templateCache.put('formio/components/fivestar/display.html',
            '<ng-form>' +
            '<form-builder-option property="label"></form-builder-option>' +
            '<form-builder-option property="placeholder"></form-builder-option>' +
            '<form-builder-option property="validate.step" label="Increment (Step)" placeholder="Enter how much to increment per step (or precision)." title="The amount to increment/decrement for each step."></form-builder-option>' +
            '<form-builder-option property="prefix"></form-builder-option>' +
            '<form-builder-option property="suffix"></form-builder-option>' +
            '<form-builder-option property="customClass"></form-builder-option>' +
            '<form-builder-option property="tabindex"></form-builder-option>' +
            '<form-builder-option property="multiple"></form-builder-option>' +
            '<form-builder-option property="persistent"></form-builder-option>' +
            '<form-builder-option property="tableView"></form-builder-option>' +
            '</ng-form>'
        );

        // Create the API markup.
        $templateCache.put('formio/components/fivestar/validate.html',
            '<ng-form>' +
            '<form-builder-option property="validate.required"></form-builder-option>' +
            '<form-builder-option property="validate.min" type="number" label="Minimum Value" placeholder="Minimum Value" title="The minimum value this field must have before the form can be submitted."></form-builder-option>' +
            '<form-builder-option property="validate.max" type="number" label="Maximum Value" placeholder="Maximum Value" title="The maximum value this field must have before the form can be submitted."></form-builder-option>' +
            '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
            '</ng-form>'
        );
    }
]);

app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
        var isNumeric = function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        formioComponentsProvider.register('userpicker', {
            title: 'User Picker',
            template: 'formio/components/userpicker.html',
            settings: {
                input: true,
                tableView: true,
                inputType: 'text',
                label: '',
                key: 'userpickerField',
                placeholder: '',
                prefix: '',
                suffix: '',
                defaultValue: 0,
                protected: false,
                persistent: true,
                validate: {
                    required: false,
                    min: '',
                    max: '',
                    step: 'any',
                    integer: '',
                    multiple: '',
                    custom: ''
                }
            },
            controller: ['$scope', function($scope) {
                // Implement logic here...
                console.log($scope)
            }]
        });
    }
]);

app.run([
    '$templateCache',
    'FormioUtils',
    function($templateCache, FormioUtils) {
        $templateCache.put('formio/components/userpicker.html', FormioUtils.fieldWrap(
            '<div ng-controller="formBuilderCtrl"><angucomplete-alt id="ex10" placeholder="User" pause="500" selected-object="selectedUser" remote-url="http://localhost:8080/api/v1/userpickers/find?query=" remote-url-data-field="items" title-field="firstName,lastName" description-field="email" minlength="3" image-field="avatar" input-class="form-control form-control-small" match-class="highlight" initial-value="userModel.email"  box-type="md"></angucomplete-alt></div>'
        ));
    }
]);

app.config([
    'formioComponentsProvider',
    function(formioComponentsProvider) {
        formioComponentsProvider.register('userpicker', {
            icon: 'fa fa-user',
            views: [
                {
                    name: 'Display',
                    template: 'formio/components/userpicker/display.html'
                },
                {
                    name: 'Validation',
                    template: 'formio/components/userpicker/validate.html'
                },
                {
                    name: 'API',
                    template: 'formio/components/common/api.html'
                },
                {
                    name: 'Layout',
                    template: 'formio/components/common/layout.html'
                },
                {
                    name: 'Conditional',
                    template: 'formio/components/common/conditional.html'
                }
            ]
        });
    }
]);
app.run([
    '$templateCache',
    function($templateCache) {
        // Create the settings markup.
        $templateCache.put('formio/components/userpicker/display.html',
            '<ng-form>' +
            '<form-builder-option property="label"></form-builder-option>' +
            '<form-builder-option property="placeholder"></form-builder-option>' +
            '<form-builder-option property="validate.step" label="Increment (Step)" placeholder="Enter how much to increment per step (or precision)." title="The amount to increment/decrement for each step."></form-builder-option>' +
            '<form-builder-option property="prefix"></form-builder-option>' +
            '<form-builder-option property="suffix"></form-builder-option>' +
            '<form-builder-option property="customClass"></form-builder-option>' +
            '<form-builder-option property="tabindex"></form-builder-option>' +
            '<form-builder-option property="multiple"></form-builder-option>' +
            '<form-builder-option property="persistent"></form-builder-option>' +
            '<form-builder-option property="tableView"></form-builder-option>' +
            '</ng-form>'
        );

        // Create the API markup.
        $templateCache.put('formio/components/userpicker/validate.html',
            '<ng-form>' +
            '<form-builder-option property="validate.required"></form-builder-option>' +
            '<form-builder-option property="validate.min" type="number" label="Minimum Value" placeholder="Minimum Value" title="The minimum value this field must have before the form can be submitted."></form-builder-option>' +
            '<form-builder-option property="validate.max" type="number" label="Maximum Value" placeholder="Maximum Value" title="The maximum value this field must have before the form can be submitted."></form-builder-option>' +
            '<form-builder-option-custom-validation></form-builder-option-custom-validation>' +
            '</ng-form>'
        );
    }
]);

app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        config.headers = config.headers || {};        
        config.headers['Pragma'] = undefined;
        config.headers['Cache-Control'] = undefined;
        config.headers['X-Requested-With'] = undefined;
        config.headers['X-Requested-With'] = undefined;
        config.headers['If-Modified-Since'] = undefined;
        return config;
      }
  };
  });
});
// var fivestarrender = require("./fivestar.render.js");
// var fivestarbuilder = require("./fivestar.builder.js");
// app.run(run)
// app.config(config);

// function config(formioComponentsProvider) {

//     //form RENDER
//     formioComponentsProvider.register('fivestar', {
//         title: 'Tool',
//         template: 'formio/components/fivestar.html',
//         group: 'layout',
//         settings: {
//             input: false,
//             key: 'columns',
//             columns: [{ components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }, { components: [] }]
//         },
//         viewTemplate: 'formio/componentsView/fivestar.html'
//         //controller: ['$scope', function ($scope) {
//         //    // Implement logic here...
//         //}]
//     });

//     //form BUILDER
//     formioComponentsProvider.register('fivestar', {
//         fbtemplate: 'formio/formbuilder/fivestar.html',
//         icon: 'fa fa-gavel',
//         noDndOverlay: true,
//         confirmRemove: true,
//         views: [
//           {
//               name: 'Display',
//               template: 'formio/components/fivestar/display.html'
//           },
//           {
//               name: 'API',
//               template: 'formio/components/common/api.html'
//           },
//           {
//               name: 'Conditional',
//               template: 'formio/components/common/conditional.html'
//           }
//         ]
//     });
// }

// function run(formioComponents, $templateCache, FormioUtils) {
//     formioComponents.components.content.disabled = true;
//     formioComponents.components.fieldset.disabled = true;
//     formioComponents.components.panel.disabled = true;
//     formioComponents.components.table.disabled = true;
//     formioComponents.components.well.disabled = true;
//     formioComponents.components.resource.disabled = true;
//     formioComponents.components.container.disabled = true;
//     formioComponents.components.custom.disabled = true;
//     //formioComponents.groups.layout.disabled = true;

//     //form RENDER
//     $templateCache.put('formio/components/fivestar.html',
//                            FormioUtils.fieldWrap("<div class=\"row\">\n  <div class=\"col-sm-1\" style=\"width:9.333333%\" ng-repeat=\"column in component.columns track by $index\">\n    <formio-component\n      ng-repeat=\"_component in column.components track by $index\"\n      component=\"_component\"\n      data=\"data\"\n      formio=\"formio\"\n      submission=\"submission\"\n      hide-components=\"hideComponents\"\n      ng-if=\"builder ? '::true' : isVisible(_component, data)\"\n      formio-form=\"formioForm\"\n      read-only=\"isDisabled(_component, data)\"\n      grid-row=\"gridRow\"\n      grid-col=\"gridCol\"\n      builder=\"builder\"\n    ></formio-component>\n  </div>\n</div>\n"
//                          ));

//     $templateCache.put('formio/componentsView/fivestar.html',
//       FormioUtils.fieldWrap("<div class=\"row\">\n  <div class=\"col-sm-1\" style=\"width:9.333333%\" ng-repeat=\"column in component.columns track by $index\">\n    <formio-component-view\n      ng-repeat=\"_component in column.components track by $index\"\n      component=\"_component\"\n      data=\"data\"\n      form=\"form\"\n      submission=\"submission\"\n      ignore=\"ignore\"\n      ng-if=\"builder ? '::true' : isVisible(_component, data)\"\n      builder=\"builder\"\n    ></formio-component-view>\n  </div>\n</div>\n"
//     ));

//     //form Builder
//     $templateCache.put('formio/formbuilder/fivestar.html', FormioUtils.fieldWrap(
//         '<div class="row">' +
//             '<div class="col-xs-2 component-form-group" ng-repeat="component in component.columns">' +
//                 '<form-builder-list class="formio-column" component="component" form="form" formio="::formio"></form-builder-list>' +
//             '</div>' +
//         '</div>'
//      ));
//     // Create the settings markup.
//     $templateCache.put('formio/components/fivestar/display.html',
//      '<ng-form>' +
//       '<form-builder-option property="customClass"></form-builder-option>' +
//     '</ng-form>'
//     );
// }