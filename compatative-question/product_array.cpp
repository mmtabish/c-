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

/// big o(n)


class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n, 1);

        // Step 1: Prefix products
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            result[i] = prefix;
            prefix *= nums[i];
        }

        // Step 2: Suffix products (combined in result array)
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }

        return result;
    }
};
