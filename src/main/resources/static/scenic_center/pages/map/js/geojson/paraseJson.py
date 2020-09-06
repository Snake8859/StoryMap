import json
import os
from copy import deepcopy

#构建多个js
def createJS(fileName):
    f = open(fileName,mode='r+',encoding='utf-8')
    #json对象解析为python对象
    json_py = json.loads(f.read())
    data = json_py['data'] #dict类型
    #获取poi名称和id
    poi_name = data['base']['name'] 
    poi_id = data['base']['poiid']
    #获取经纬串
    spec = data['spec']     #dict类型
    inputList = [] #输出list python对象
    try:
        mining_shape = spec['mining_shape'] #dict类型
        shape = mining_shape['shape'] #sty类型
        shapeList =shape.split(';') #list类型 
        for item in shapeList:
            #str转float
            tempList = item.split(',')
            tempList[0] = float(tempList[0])
            tempList[1] = float(tempList[1])
            inputList.append(tempList)
    except Exception :
        print('没有矢量面')
    #读取模板文件
    templateFile = open('template.json',mode='r+',encoding='utf-8')
    #转为python对象
    geojson_py = json.loads(templateFile.read())
    #构造面geojson对象
    #将解析poi名称和id追加
    geojson_py['features'][0]['properties']['id'] = poi_id
    geojson_py['features'][0]['properties']['name'] = poi_name
    #将解析坐标串追加
    geojson_py['features'][0]['geometry']['coordinates'][0].extend(inputList)
    #python对象解析为json
    geojson = json.dumps(geojson_py)
    geojson = 'var '+poi_id+' = '+geojson
    #写入文件
    outFile = open(poi_name+'.js',mode='w+',encoding='utf-8')
    outFile.write(geojson)
    #统一关闭文件
    f.close()
    templateFile.close()
    outFile.close()

#构建一个js
def createOneJS(folderName):
    #读取模板文件
    templateFile = open('template.json',mode='r+',encoding='utf-8')
    #转为python对象
    geojson_py = json.loads(templateFile.read())
    #取出模板中要素集
    features = geojson_py['features']
    #遍历整个文件夹
    dirList = os.listdir(folderName)
    for fileName in dirList:
        #过滤.py
        if(fileName.endswith('json')):
            #过滤模板
            if(fileName!='template.json'):
                f = open(fileName,mode='r+',encoding='utf-8')
                #json对象解析为python对象
                json_py = json.loads(f.read())
                data = json_py['data'] #dict类型
                #获取poi名称和id
                poi_name = data['base']['name'] 
                poi_id = data['base']['poiid']
                #获取经纬串
                spec = data['spec']     #dict类型
                tempInputList = [] #临时输出list python对象
                try:
                    mining_shape = spec['mining_shape'] #dict类型
                    shape = mining_shape['shape'] #sty类型
                    shapeList =shape.split(';') #list类型 
                    for item in shapeList:
                        #str转float
                        tempList = item.split(',')
                        tempList[0] = float(tempList[0])
                        tempList[1] = float(tempList[1])
                        tempInputList.append(tempList)
                except Exception :
                    pass
                    #print('没有矢量面')
                #print(tempInputList)
                #需要使用深复制，不能直接引用，不然导致引用问题
                feature = deepcopy(features[0])
                #几何范围
                feature['geometry']['coordinates'].append(tempInputList)
                #id和名称
                feature['properties']['id'] = poi_id
                feature['properties']['name'] = poi_name
                #print(feature)
                features.append(feature)
                f.close()
    #删除第一个模板
    del features[0]
    print(features)
    outFile = open('test.js',mode='w+',encoding='utf-8')
    outFile.write('var jq = '+json.dumps(geojson_py)) 
    #关闭文件
    templateFile.close()
    outFile.close()
    
createOneJS('./')
'''
dirList = os.listdir('./')
for fileName in dirList:
    #过滤.py
    if(fileName.endswith('json')):
        #过滤模板
        if(fileName!='template.json'):
            createJS(fileName)
'''

'''
#打开json文件
f = open('10东方红广场.json',mode='r+',encoding='utf-8')
#测试文件读取情况
#print (f.read()) 
#json对象解析为python对象
json_py = json.loads(f.read())
#测试输出内容
#print(json_py) 
#测试打印部分信息
#print(json_py['status'])
#print(type(json_py['data']['spec']))
data = json_py['data'] #dict类型

#获取poi名称和id
poi_name = data['base']['name'] 
poi_id = data['base']['poiid']
#print(poi_name)
#print(poi_id)

#获取经纬串
spec = data['spec']     #dict类型

inputList = [] #输出list python对象
try:
    mining_shape = spec['mining_shape'] #dict类型
    shape = mining_shape['shape'] #sty类型
    shapeList =shape.split(';') #list类型 
    for item in shapeList:
        #print(item) #str类型
        #str转float
        tempList = item.split(',')
        tempList[0] = float(tempList[0])
        tempList[1] = float(tempList[1])
        inputList.append(tempList)
    #print(inputList)
    #python对象解析为json对象
    #json_json = json.dumps(inputList)
    #print(json_json)
except Exception :
    print('没有矢量面')

#读取模板文件
templateFile = open('template.json',mode='r+',encoding='utf-8')
#转为python对象
geojson_py = json.loads(templateFile.read())
#构造面geojson对象
#将解析poi名称和id追加
geojson_py['features'][0]['properties']['id'] = poi_id
geojson_py['features'][0]['properties']['name'] = poi_name
#将解析坐标串追加
geojson_py['features'][0]['geometry']['coordinates'][0].extend(inputList)
#python对象解析为json
geojson = json.dumps(geojson_py)
geojson = 'var '+poi_id+' = '+geojson
#print(geojson)
#写入文件
outFile = open(poi_name+'.js',mode='w+',encoding='utf-8')
outFile.write(geojson)
#统一关闭文件
f.close()
templateFile.close()
outFile.close()
'''
