package com.rx.pub.file.comp;

import com.rx.ext.annotation.ExtClass;
import com.rx.ext.form.field.Picker;

@ExtClass(alias="widget.iconinput",alter="Rx.view.file.IconInputField")//,alter="Rx.view.sys.OrgField"
public class IconInputField extends Picker{
	
	public final static String FULLPATH = "fullPath";
	public final static String REUSEKEY = "reuseKey";
	public final static String FILEACCESS = "fileAccess";	// 访问权限

	public IconInputField(){
		
	}
}