function checkAnagram(str1, str2) {
        let ObjStr1 = {};
        if (str1.length !== str2.length) {
          return false;
        }
        for (ch of str1) {
          // console.warn(ch)
          ObjStr1[ch] = (ObjStr1[ch] || 0) + 1;
        }
        // console.warn(ObjStr1);
        for (ch of str2) {
        //   console.warn(ObjStr1[ch]);
          if (!ObjStr1[ch]) {
            return false;
          }
          ObjStr1[ch]--;
        }
        return true
      }

      console.warn(checkAnagram("anil", "nila"));