import sys
import os
import pandas as pd
print('#Hello from python#')
missing_values = ["NA"]
print('First param:'+sys.argv[1]+'#')
print(sys.argv)
ArgLength = int(sys.argv[1])
print(type(ArgLength))
DirPrepare = 'uploadsPrepare/'
Dir = 'uploads/'
i = 2
print(ArgLength+2)
while i < ArgLength+2:
    print(i)
    
    file = sys.argv[i]
    print(file)
    if file.find(".csv")>=0:
        print(Dir)
        df = pd.read_csv(Dir+file,na_values=missing_values)
        df.fillna('null',inplace=True)
        df.to_csv(DirPrepare+file,header=True)
    if file.find(".xlsx")>=0:
        print(Dir)
        xl = pd.ExcelFile(Dir+file)
        print(xl.sheet_names)
        for index in xl.sheet_names:
            print(index)
            df = pd.read_excel(Dir+file,sheet_name=index,na_values=missing_values)
            df.fillna('null',inplace=True)
            df.to_csv(DirPrepare+index+".csv",header=True)
            pass
    i+=1

"""
#df = pd.read_csv('uploads/Community Quarantine Facilities Daily Entry.csv',na_values = missing_values)
df = pd.read_excel('uploads/COVID 19 Donation,UIT V3.xlsx',sheet_name='All',na_values= missing_values)
df.fillna('null',inplace=True)
df.to_csv('uploadsPrepare/test.csv',header=True)
print(df.head())
"""