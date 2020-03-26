/*
 * 
 * */
Ext.define('Rx.model.dysql.Column',{
    extend: 'Ext.data.Model',
    idProperty: 'field',
    fields:[{name:'field',type:'string'},{name:'orderby',type:'bool'},{name:'desc',type:'bool'},{name:'text',type:'string'}]
});
Ext.define('Rx.view.dysql.DySqlForm',{
	requires:[
		'com.rx.pub.dysql.controller.DySqlController',
		'com.rx.pub.dysql.dto.DySqlFieldGrid',
		'Ext.grid.feature.Grouping',
		'Rx.ux.GridGrouping',
		'Ext.selection.CheckboxModel',
       	'Rx.view.dysql.ConditionForm',
       	'Ext.grid.plugin.CellEditing'
	],
    extend: 'Ext.form.Panel',
    uses:['Rx.view.dysql.FieldSelectorWindow','Rx.view.dysql.TableSelectorWindow'],
    alias:'widget.dysqlform',
    recordId:null,//有值表示修改
    getValues:function(){
    	var grid = this.lookupI('fields');
    	var sto = grid.getStore();
    	var fields = [];
    	sto.each(function(rec){
    		this.push(rec.getData());
    	},fields);
    	if(fields && fields.length > 0){
    	}else{
    		Rx.Msg.error('错误','没有选择任何列字段.');
    		return false;
    	}
    	return {
    		dySqlName:this.lookupI('dySqlName').getValue(),
    		colSearchJson:Ext.encode({
    			tableName:this.lookupI('tableName').getValue(),
    			fields:fields,
    			where:this.lookupI('conditionform').getValues()
    		})
    	};
    },
    setValues:function(va){
    	var cj = Ext.decode(va.colSearchJson);
    	this.lookupI('dySqlName').setValue(va.dySqlName);
    	this.lookupI('tableName').setValue(cj.tableName);
    	this.lookupI('conditionform').setValues(cj.where);
    	var gd = this.lookupI('fieldgrid');
    	var fieldSto = this.lookupI('fields').getStore();
    	var sto = gd.getStore();
    	var fds = cj.fields;
    	var sc = [];
    	if(fds && fds.length > 0){
    		var rec = null;
    		for(var o in fds){
    			fieldSto.add(fds[o]);
    			rec = sto.getById(fds[o].field);
    			if(rec){
    				sc.push(rec);
    			}
    		}
    	}
    	if(sc.length > 0){
    		gd.getSelectionModel().select(sc,true);
    	}
    	
    },
    initComponent:function(){
    	var me = this;
    	Ext.apply(me,{
    		bodyStyle:'overflow-y:auto;padding:10px;',
    		layout:{
    			type:'vbox',
    			align:'stretch'
    		},
    		items:[{
    			emptyText:'报表名称',
    			name:'dySqlName',
    			itemId:'dySqlName',
    			xtype:'textfield',
    			allowBlank:false
    		},{
    			xtype:'combo',
    			//fieldLabel:'主表',
    			editable:false,
    			itemId:'tableName',
    			allowBlank:false,
    			emptyText:'主表',
    			displayField:'tableText',
    			valueField:'tableName',
    			value:'rt_business_apply',
    			store:{
    				model:'com.rx.pub.dysql.vo.DySqlTableVo',
    				autoLoad:true,
    				proxy:{
    					type: 'ajax',
				        url: DySqlController.listDySqlTable.url,
				        reader: {
				            type: 'json',
				            rootProperty: 'data'
				        }
    				}
    			}
    		},{
    			xtype:'container',
    			itemId:'fieldcontainer',
    			frame:true,
    			layout:{
    				type:'hbox',
    				align:'stretch'
    			},
    			flex:1,
    			items:[{
	    	    	itemId:'fields',
	    	    	//style:'margin-right:5px',
	    	    	plugins: [Ext.create('Ext.grid.plugin.CellEditing')],
	    	    	frame:true,
	    	    	width:300,
			    	xtype:'gridpanel',
	    	    	store: {
	    	    		model:'Rx.model.dysql.Column',
	    	    		proxy:{
	    	    			type:'memory'
	    	    		}
	    	    	},
				    columns:[
				        { text: '选择列', field:{type:'textfield'},dataIndex: 'text',menuDisabled:true,sortable:false,draggable:false,resizable:false,flex:1},
				        {
				        	text: '排序', dataIndex: 'orderby',xtype:'checkcolumn',menuDisabled:true,sortable:false,draggable:false,resizable:false,width:60
				        },{
				        	text: '逆序', dataIndex: 'desc',xtype:'checkcolumn',menuDisabled:true,sortable:false,draggable:false,resizable:false,width:60
				        },{
					        text: '',
					        xtype:'actioncolumn',
					        sortable:false,
					        resizable:false,
					        menuDisabled:true,
					        draggable:false,
					        width:30,
					        items: [{
					            icon: Rx.Icons16.arrow_up.path,
					            altText:'上移',
					            tooltip: '上移',
					            handler: function(grid, rowIndex, colIndex) {
					                if(rowIndex > 0){
					                	var rec = grid.getStore().getAt(rowIndex);
					                	grid.getStore().insert(rowIndex - 1,[rec]);
					                }
					            }
					        }]
			        }],
	    	    	selModel:{
				   		mode:'SINGLE'
				   },
				   columnLines: true
	    	    },{
	    	    	//title:'字段',
	    	    	itemId:'fieldgrid',
	    	    	frame:true,
	    	    	flex:1,
	    	    	//groupField: 'project'
			    	xclass:'DySqlFieldGrid',
	    	    	selType: 'checkboxmodel',
	    	    	selModel:{
				   		mode:'MULTI',
				   		toggleOnClick:false,
				   		checkOnly:true,
				   		allowDeselect:false
				   },
				   features: [{
				        ftype: 'grouping',
				        groupHeaderTpl: '{groupValue} ({rows.length})',
				        hideGroupedHeader: true,
				        //collapsible:true,
				        startCollapsed:true
				        //,id: 'featuresGroupName'
				    }],
				   columnLines: true,
				   listeners:{
				   		deselect:function(gd,rec,idx,eO){
				   			var fds = this.getOwnerCt('fieldcontainer').lookupI('fields');
				   			var index = fds.getStore().find('field',rec.get('name'));
				   			if(index > -1){
				   				fds.getStore().remove([index]);
				   			}
				   		},
				   		select:function(gd,rec,idx,eO){
				   			var fds = this.getOwnerCt('fieldcontainer').lookupI('fields');
				   			var index = fds.getStore().find('field',rec.get('name'));
				   			if(index > -1){
				   				
				   			}else{
				   				fds.getStore().add({orderby:false,desc:false,field:rec.get('name'),text:rec.get('text')});
				   			}
				   		}
				   }
	    	    }]
    		},{
    	    	//title:'条件',
    	    	frame:true,
    	    	style:'margin-top:10px',
    	    	itemId:'conditionform',
    	    	xtype:'conditionform'
    	    }],
    	    dockedItems:[{
				xtyle:'toolbar',
				dock:'bottom',
				items:[{
					xtype:'button',
					text:'重置',
					itemId:'resetBtn',
					iconCls: 'x-fa fa-eraser',
					cls:'r-btn-font-normal',
			    	style:{float:'right',margin:"5px 10px 5px 0"},
					handler:function(){
						var fm = this.up('form');
						fm.getForm().reset();							
					}
				},{
					xtype:'button',
					text:'提交',
					itemId:'searchBtn',
					iconCls: 'x-fa fa-check',
					cls:'r-btn-font-normal',
			    	style:{float:'right',margin:"5px 10px 5px 10px"},
					handler: function(){
						var fm = this.up('form');
						if(!fm.isValid())
						{
							Rx.Msg.error('错误','有不合法的输入.');
							return;
						}
						var vs = fm.getValues();
						if(!vs){
							return;
						}
						fm.setLoading('提交中');
						if(fm.recordId){
							vs.dySqlId = fm.recordId;
							DySqlController.updateDysql({
				    			params:vs,
				    			callback:function(o,f,r){
				    				this.setLoading(false);
				    				if(f){
				    					this.up('window').returnValue(true);
				    				}
				    			},
				    			scope:fm
				    		});
						}else{
			    			DySqlController.addDysql({
				    			params:vs,
				    			callback:function(o,f,r){
				    				this.setLoading(false);
				    				if(f){
				    					this.up('window').returnValue(true);
				    				}
				    			},
				    			scope:fm
				    		});
						}
	                }
				}]
			}]
    	});
    	me.callParent(arguments);
    	if(me.recordId){
    		me.setLoading('请求中');
    		me.lookupI('fieldgrid').getStore().on('load',function(){
    			DySqlController.getDysql({
	    			params:{
	    				dySqlId:me.recordId
	    			},
	    			callback:function(o,f,r){
	    				this.setLoading(false);
	    				if(f){
	    					this.setValues(r.responseJson.data);
	    				}else{
	    					this.up('window').close();
	    				}
	    			},
	    			scope:me
	    		});
    		},me);
    	}
    }
});