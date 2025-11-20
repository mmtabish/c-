// User function Template for C++
class Solution {
  public:
    pair<int, int> getMinMax(vector<int> arr) {
        // code here
        int n = arr.size();
        // just checking
        // commit
        //md
        //check data
        // pic//
        //just comment//llllklnl
        //pllllll//kkln..l,lll
        if(n == 0 ) return {-1 , -1 };
        
        int minVal = arr[0];
        int maxVal = arr[0];

        // min/
        
        for(int i =0 ; i < n ; i++ ){
            
            if(arr[i] < minVal){
                minVal = arr[i];
            }
            
            if(arr[i] > maxVal){
                maxVal = arr[i];
            }
        }
        
        return {minVal , maxVal};
    }
};