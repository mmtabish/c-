class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
          int n = nums.size();

          vector<int> arr;

          for(int i=0; i<n; i++){

                int product =1;
            for(int j=0; j<n; j++){
                if(i!= j){
                    product *=nums[j];
                }
            }

            arr.push_back(product);
          }

          return arr;
    }
};

