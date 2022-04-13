require 'test_helper'

class BuildingsControllerTest < ActionDispatch::IntegrationTest
  test "should get get_buildings_by_customer" do
    get buildings_get_buildings_by_customer_url
    assert_response :success
  end

  test "should get building_search" do
    get buildings_building_search_url
    assert_response :success
  end

end
