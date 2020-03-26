﻿<%@ page language="java" pageEncoding="UTF-8"%>
<%
String ExtBasePath = "https://nnstatic.oss-cn-shenzhen.aliyuncs.com/jsFramework/ext6/";/*"ext6/";*/
%>
<%  
	String path = request.getServerName() + ":" + request.getServerPort() + request.getContextPath();  
%>
<!DOCTYPE HTML>
<html class="x-viewport">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
    <meta charset="UTF-8">
    <title>开发者工具</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css" href="<%=ExtBasePath%>build/classic/theme-triton/resources/theme-triton-all.css">
    <link rel="stylesheet" type="text/css" href="dashboard/classic/resources/Admin-all.css">
    
    <link rel="stylesheet" type="text/css" href="<%=ExtBasePath%>packages/charts/classic/classic/resources/charts-all.css">
    <link rel="stylesheet" type="text/css" href="<%=ExtBasePath%>packages/charts/classic/triton/resources/charts-all.css">
    
    <link rel="stylesheet" type="text/css" href="resources/override.css">
    <link rel="stylesheet" type="text/css" href="resources/icons.css">
    <link rel="stylesheet" type="text/css" href="resources/public.css">
    
    <script type="text/javascript" src="<%=ExtBasePath%>build/ext-all.js"></script>
    
    <script type="text/javascript" src="<%=ExtBasePath%>packages/charts/classic/charts.js"></script>
     
    <script type="text/javascript" src="<%=ExtBasePath%>build/classic/theme-triton/theme-triton.js" defer></script>
     
    <script type="text/javascript" src="<%=ExtBasePath%>build/classic/locale/locale-zh_CN.js"></script>

    <script type="text/javascript">
    Ext.ExtBasePath = '<%=ExtBasePath%>';
    Ext.ServerPath = '<%=path%>';
    Ext.ServerContextPath = '<%=request.getContextPath()%>';
    </script>
    <script type="text/javascript" src="ext-config.js"></script>
    
    <script type="text/javascript" src="dev.js"></script>
</head>
<body>

<div id="loading" style="border:/*1px solid #157fcc;*/border-radius:3px;-moz-border-radius:3px;/*background:#FFF;*/position:absolute;left:50%;top:50%;width:150px;height:50px;margin-left:-75px;margin-top:-25px;z-index:30000;">
	<img src="resources/images/loading/large-loading.gif" style="margin:10px;float:left;vertical-align:top;"/>
	<br/>
	<span id="loading-msg" style="display:block;margin:5px;color:#d1d1d1;">加载中...</span>
</div>
</body>
</html>
