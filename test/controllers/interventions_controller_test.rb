require 'test_helper'

class InterventionsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get interventions_create_url
    assert_response :success
  end

end
